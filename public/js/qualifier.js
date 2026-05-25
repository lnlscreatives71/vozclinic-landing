/**
 * VozClinic Qualifier Form Logic
 * Powers /lista-espera (ES) and /waitlist (EN).
 *
 * Posts to the same-origin Vercel signing proxy (api/sign-qualifier.ts),
 * which HMAC-signs the body and forwards to the LNL CRM webhook. The
 * CRM responds with { contact_id, pms_phase1_fit, redirect_url, ... };
 * we honor the redirect_url so Phase 1 fit visitors go straight to the
 * demo-booking page and waitlist visitors go to the thank-you page.
 */

// Absolute URL on the canonical www host so visitors who land on the
// apex domain (vozclinic.com) don't hit Vercel's apex->www 307 redirect
// mid-POST, which some browsers handle inconsistently for cross-origin
// redirects.
const CRM_ENDPOINT = 'https://www.vozclinic.com/api/sign-qualifier';

document.addEventListener('DOMContentLoaded', () => {
  const isSpanish =
    window.location.pathname.includes('/lista-espera') ||
    document.documentElement.lang === 'es';

  const form = document.getElementById('qualifier-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-btn-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const formErrorAlert = document.getElementById('form-error-alert');
  // Capture the page-defined button label so the loading->idle transition
  // restores the right text on each page (e.g. "Enviar aplicación" vs
  // "Enviar mi aplicación" on the DP page).
  const submitDefaultText = submitText ? submitText.textContent : '';

  if (!form) return;

  const validationRules = {
    first_name: { required: true },
    last_name: { required: true },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    whatsapp_number: { required: true, minLength: 5 },
    clinic_name: { required: true },
    clinic_type: { required: true },
    pms_system: { required: true },
    weekly_whatsapp_volume: { required: true },
  };

  Object.keys(validationRules).forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', () => validateField(input, validationRules[id]));
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formErrorAlert.style.display = 'none';
    formErrorAlert.textContent = '';

    let isFormValid = true;
    Object.keys(validationRules).forEach((id) => {
      const input = document.getElementById(id);
      if (input && !validateField(input, validationRules[id])) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      showGeneralError(
        isSpanish
          ? 'Por favor completa los campos marcados en rojo antes de enviar.'
          : 'Please correct the fields marked in red before submitting.'
      );
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const langRadio = form.querySelector('input[name="language_preference"]:checked');
    const languagePref = langRadio ? langRadio.value : (isSpanish ? 'es' : 'bilingual');

    const fd = new FormData(form);
    const payload = {
      first_name: String(fd.get('first_name') || '').trim(),
      last_name: String(fd.get('last_name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      whatsapp_number: String(fd.get('whatsapp_number') || '').trim(),
      clinic_name: String(fd.get('clinic_name') || '').trim(),
      clinic_city: String(fd.get('clinic_city') || '').trim() || undefined,
      clinic_type: String(fd.get('clinic_type') || ''),
      pms_system: String(fd.get('pms_system') || ''),
      decision_role: String(fd.get('decision_role') || '').trim() || undefined,
      weekly_whatsapp_volume: String(fd.get('weekly_whatsapp_volume') || ''),
      crossborder_percent: String(fd.get('crossborder_percent') || '').trim() || undefined,
      language_preference: languagePref,
      lead_source_text: String(fd.get('lead_source_text') || '').trim() || undefined,
    };

    // Intent is carried on the inbound URL: ?intent=dp from the homepage's
    // gold "Apply as founding partner" CTAs marks this as a DP application
    // so the CRM tags the contact dp-applicant. Waitlist CTAs omit the
    // param, leaving source undefined.
    const intent = new URLSearchParams(window.location.search).get('intent');
    if (intent === 'dp') {
      payload.source = 'design_partner_intent';
    }

    setLoadingState(true);

    try {
      const response = await fetch(CRM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json().catch(() => ({}));

      if (response.ok && json && json.data && json.data.redirect_url) {
        // CRM tells us where to go (demo booking for Phase 1 fit,
        // waitlist thank-you otherwise).
        window.location.href = json.data.redirect_url;
        return;
      }

      // Fallback redirect if response shape is unexpected but status OK.
      if (response.ok) {
        window.location.href = isSpanish ? '/lista-gracias/' : '/waitlist-thanks/';
        return;
      }

      const errorMsg =
        (json && (json.error || (json.error && json.error.message))) ||
        (isSpanish
          ? 'Hubo un problema al enviar tu aplicación. Por favor inténtalo de nuevo.'
          : 'There was a problem sending your application. Please try again.');
      throw new Error(typeof errorMsg === 'string' ? errorMsg : 'Submission failed');
    } catch (err) {
      console.error('Qualifier submission error:', err);
      setLoadingState(false);
      showGeneralError(
        isSpanish
          ? 'No pudimos enviar tu aplicación. Por favor inténtalo de nuevo en unos minutos, o escríbeme directo a lainiem@vozclinic.com.'
          : "We couldn't send your application. Please try again in a few minutes, or email me directly at lainiem@vozclinic.com."
      );
    }
  });

  // ----------------- helpers -----------------

  function validateField(input, rules) {
    const val = (input.value || '').trim();
    const errEl = document.getElementById(`${input.id}-error`);
    const setErr = (msg) => {
      input.classList.add('is-invalid');
      if (errEl) errEl.textContent = msg;
    };
    const clearErr = () => {
      input.classList.remove('is-invalid');
      if (errEl) errEl.textContent = '';
    };

    if (rules.required && !val) {
      setErr(isSpanish ? 'Este campo es obligatorio.' : 'This field is required.');
      return false;
    }
    if (val && rules.pattern && !rules.pattern.test(val)) {
      setErr(isSpanish ? 'Formato inválido.' : 'Invalid format.');
      return false;
    }
    if (val && rules.minLength && val.length < rules.minLength) {
      setErr(
        isSpanish
          ? `Debe tener al menos ${rules.minLength} caracteres.`
          : `Must be at least ${rules.minLength} characters.`
      );
      return false;
    }
    clearErr();
    return true;
  }

  function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const errEl = document.getElementById(`${input.id}-error`);
    if (errEl) errEl.textContent = '';
  }

  function showGeneralError(message) {
    if (!formErrorAlert) return;
    formErrorAlert.textContent = message;
    formErrorAlert.style.display = 'block';
    formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function setLoadingState(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    if (submitText) {
      submitText.textContent = loading
        ? isSpanish
          ? 'Enviando…'
          : 'Sending…'
        : submitDefaultText;
    }
    if (submitSpinner) {
      submitSpinner.style.display = loading ? 'inline-block' : 'none';
    }
  }
});
