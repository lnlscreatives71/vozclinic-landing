/**
 * VozClinic Referral Landing Page Logic
 * Handled by LNL Automations
 */

// Absolute URL on the canonical www host so visitors who land on the
// apex domain (vozclinic.com) don't hit Vercel's apex->www 307 redirect
// mid-POST, which some browsers handle inconsistently for cross-origin
// redirects. The signing proxy (api/sign-referral.ts) HMAC-signs the
// body server-side using VOZCLINIC_WEBHOOK_SECRET and forwards to the
// LNL CRM webhook.
const CRM_ENDPOINT = 'https://www.vozclinic.com/api/sign-referral';

// Fire CompleteRegistration at the moment the submit succeeds, then navigate,
// so the conversion is recorded before the visitor leaves this site. The short
// delay gives the pixel beacon time to leave before the page unloads; the
// guard means a missing or blocked fbq never stops the redirect.
function completeRegistrationThen(url) {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    window.location.href = url;
  };
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'CompleteRegistration');
      setTimeout(go, 300);
      return;
    }
  } catch (err) {
    console.error('CompleteRegistration tracking failed:', err);
  }
  go();
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Identify Page Language
  const isSpanish = window.location.pathname.includes('/recomienda') || document.documentElement.lang === 'es';
  const langKey = isSpanish ? 'es' : 'en';

  // 2. Locate DOM elements
  const form = document.getElementById('referral-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-btn-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const formErrorAlert = document.getElementById('form-error-alert');

  // Input fields
  const refNameInput = document.getElementById('referrer_name');
  const refClinicInput = document.getElementById('referrer_clinic');
  const refEmailInput = document.getElementById('referrer_email');
  const referredClinicInput = document.getElementById('referred_clinic_name');
  const referredContactInput = document.getElementById('referred_contact_person');
  const referredContactInfoInput = document.getElementById('referred_email_or_whatsapp');
  const refContextInput = document.getElementById('relationship_context');
  const refNotesInput = document.getElementById('additional_notes');

  // Hidden inputs or states
  let referrerPms = '';

  // Character Counter Badges
  setupCharCounter('relationship_context', 'context-counter', 200);
  setupCharCounter('additional_notes', 'notes-counter', 500);

  // Initialize Interactive Calculator
  setupInteractiveCalculator();

  // 3. UTM and Waitlist Auto-Pre-fill Sequence
  const urlParams = new URLSearchParams(window.location.search);

  // Capture UTM parameters
  const utmSource = urlParams.get('utm_source') || 'waitlist_email';
  const utmCampaign = urlParams.get('utm_campaign') || 'referral_program';

  // Retrieve waitlist record details from URL query params or localStorage
  const queryName = urlParams.get('referrer_name') || urlParams.get('name');
  const queryClinic = urlParams.get('referrer_clinic') || urlParams.get('clinic');
  const queryEmail = urlParams.get('referrer_email') || urlParams.get('email');
  const queryPms = urlParams.get('referrer_pms') || urlParams.get('pms');

  // Fallback check in localStorage for existing waitlist session data
  let localSession = {};
  try {
    const saved = localStorage.getItem('vozclinic_waitlist_user');
    if (saved) localSession = JSON.parse(saved);
  } catch (e) {
    console.warn('Unable to access localStorage waitlist user session:', e);
  }

  // Pre-fill fields with priority: 1. URL Parameter, 2. localStorage, 3. Empty string
  if (refNameInput) refNameInput.value = queryName || localSession.name || '';
  if (refClinicInput) refClinicInput.value = queryClinic || localSession.clinic || '';
  if (refEmailInput) refEmailInput.value = queryEmail || localSession.email || '';
  
  // Set the auto-filled PMS value
  referrerPms = queryPms || localSession.pms || 'Unspecified';

  // 4. Real-time Field Validation (Gestalt Blur / Input timing rules)
  const validationRules = {
    referrer_name: { required: true },
    referrer_clinic: { required: true },
    referrer_email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    referred_clinic_name: { required: true },
    relationship_context: { required: true, max: 200 },
    additional_notes: { required: false, max: 500 }
  };

  // Add blur listeners to validate fields after the user is finished editing
  Object.keys(validationRules).forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('blur', () => {
      validateField(input, validationRules[id]);
    });

    // Reset error class and messages dynamically as the user types
    input.addEventListener('input', () => {
      clearFieldError(input);
      if (formErrorAlert) formErrorAlert.style.display = 'none';
    });
  });

  // 5. Form submission handler
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear general error alert
      if (formErrorAlert) formErrorAlert.style.display = 'none';

      // Validate all fields before submission
      let isFormValid = true;
      Object.keys(validationRules).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          const isValid = validateField(input, validationRules[id]);
          if (!isValid) isFormValid = false;
        }
      });

      if (!isFormValid) {
        showGeneralError(isSpanish 
          ? 'Por favor corrige los campos marcados en rojo antes de enviar.' 
          : 'Please correct the fields marked in red before submitting.'
        );
        // Find first invalid input and focus it to guide accessibility
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Collect Radio Button Preference
      const attributionRadio = form.querySelector('input[name="attribution_preference"]:checked');
      const attributionPref = attributionRadio ? attributionRadio.value : 'named';

      // Assemble final CRM payload
      const payload = {
        referrer_name: refNameInput.value.trim(),
        referrer_clinic: refClinicInput.value.trim(),
        referrer_email: refEmailInput.value.trim(),
        referred_clinic_name: referredClinicInput.value.trim(),
        referred_contact_person: referredContactInput ? referredContactInput.value.trim() : '',
        referred_email_or_whatsapp: referredContactInfoInput ? referredContactInfoInput.value.trim() : '',
        relationship_context: refContextInput.value.trim(),
        attribution_preference: attributionPref,
        additional_notes: refNotesInput ? refNotesInput.value.trim() : '',
        language: langKey,
        referrer_pms: referrerPms,
        submission_timestamp: new Date().toISOString(),
        utm_source: utmSource,
        utm_campaign: utmCampaign
      };

      console.log('Posting referral payload to CRM:', payload);

      // UI visual lock state during transmission
      setLoadingState(true);

      try {
        const response = await fetch(CRM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        // Handle success
        if (response.ok || response.status === 201 || response.status === 200) {
          // Success redirection
          const successRoute = isSpanish ? '/gracias-referido/' : '/thanks-referral/';
          completeRegistrationThen(successRoute);
        } else {
          // Attempt parsing details, otherwise throw standard error
          const errorDetails = await response.json().catch(() => ({}));
          throw new Error(errorDetails.message || 'API responded with non-2xx status');
        }
      } catch (err) {
        console.error('CRM Submission error:', err);
        setLoadingState(false);
        showGeneralError(
          isSpanish
            ? 'No pudimos enviar tu presentación. Por favor inténtalo de nuevo en unos minutos, o escríbeme directo a lainie@vozclinic.com.'
            : "We couldn't send your introduction. Please try again in a few minutes, or email me directly at lainie@vozclinic.com."
        );
      }
    });
  }

  // ==========================================================================
  // Helper Functions
  // ==========================================================================

  // Interactive Calculator click engine
  function setupInteractiveCalculator() {
    const calcBtns = document.querySelectorAll('.calc-btn');
    const badge = document.getElementById('calc-badge');
    const reward = document.getElementById('calc-reward');
    const explainer = document.getElementById('calc-explainer');
    const resultBox = document.getElementById('calc-result');

    if (!calcBtns || !badge || !reward || !explainer) return;

    // One free month of your own subscription per referred clinic that
    // subscribes and stays active 60 days. Months, not dollar figures: the
    // credit is worth whatever the referrer's own plan costs.
    const esData = {
      1: {
        badge: 'Recompensa · +1 mes gratis',
        reward: '1 mes de tu plan, gratis',
        explainer: 'Cuando la clínica que recomiendas se suscribe y cumple 60 días activa, te abonamos un mes gratis de tu propia suscripción, al precio de tu plan.'
      },
      2: {
        badge: 'Recompensa · +2 meses gratis',
        reward: '2 meses de tu plan, gratis',
        explainer: 'Dos recomendaciones que se vuelven clientes: dos meses gratis de tu suscripción. Se abonan uno por clínica, conforme cada una cumple sus 60 días.'
      },
      3: {
        badge: 'Recompensa · +3 meses gratis',
        reward: '3 meses de tu plan, gratis',
        explainer: 'Tres clínicas activas recomendadas por ti son un trimestre completo sin pagar tu suscripción.'
      },
      4: {
        badge: 'Recompensa · +4 meses gratis o más',
        reward: '4 meses o más, gratis',
        explainer: 'No hay tope. Cada clínica que llegue por ti y cumpla 60 días activa suma un mes gratis más a tu cuenta.'
      }
    };

    const enData = {
      1: {
        badge: 'Reward · +1 free month',
        reward: '1 free month of your plan',
        explainer: 'When the clinic you refer subscribes and stays active for 60 days, we credit one free month of your own subscription, at your plan\'s price.'
      },
      2: {
        badge: 'Reward · +2 free months',
        reward: '2 free months of your plan',
        explainer: 'Two introductions that become customers: two free months of your subscription. They are credited one per clinic, as each one clears its 60 days.'
      },
      3: {
        badge: 'Reward · +3 free months',
        reward: '3 free months of your plan',
        explainer: 'Three active clinics referred by you is a full quarter without paying your subscription.'
      },
      4: {
        badge: 'Reward · +4 free months or more',
        reward: '4 free months or more',
        explainer: 'There is no cap. Every clinic that arrives through you and stays active 60 days adds another free month to your account.'
      }
    };

    const dataset = isSpanish ? esData : enData;

    calcBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active styling
        calcBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const val = btn.getAttribute('data-val');
        const info = dataset[val];

        if (!info) return;

        // Apply a visual fade transition
        if (resultBox) {
          resultBox.style.opacity = '0.3';
          resultBox.style.transform = 'translateY(4px)';
        }

        setTimeout(() => {
          badge.textContent = info.badge;
          reward.textContent = info.reward;
          explainer.textContent = info.explainer;

          // Highlight year-free gold premium moments
          if (val === '4') {
            badge.style.backgroundColor = 'rgba(212, 175, 55, 0.15)';
            badge.style.color = 'var(--accent-gold)';
            reward.style.color = 'var(--accent-gold)';
          } else {
            badge.style.backgroundColor = isSpanish ? 'rgba(0, 128, 128, 0.06)' : 'rgba(0, 128, 128, 0.06)';
            badge.style.color = 'var(--primary-teal)';
            reward.style.color = 'var(--primary-teal)';
          }

          if (resultBox) {
            resultBox.style.opacity = '1';
            resultBox.style.transform = 'translateY(0)';
          }
        }, 150);
      });
    });
  }

  // Character Counter helper
  function setupCharCounter(inputId, counterId, limit) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    if (!input || !counter) return;

    // Set initial count
    updateCounter(input.value.length);

    input.addEventListener('input', () => {
      updateCounter(input.value.length);
    });

    function updateCounter(length) {
      if (isSpanish) {
        counter.textContent = `${length} / ${limit} caracteres`;
      } else {
        counter.textContent = `${length} / ${limit} chars`;
      }

      if (length > limit) {
        counter.style.color = 'var(--color-error)';
      } else {
        counter.style.color = '#9CA3AF';
      }
    }
  }

  // Field validator
  function validateField(input, rules) {
    const val = input.value.trim();
    let isValid = true;
    let errorText = '';

    if (rules.required && !val) {
      isValid = false;
      errorText = isSpanish 
        ? 'Este campo es obligatorio.' 
        : 'This field is required.';
    } else if (rules.pattern && val && !rules.pattern.test(val)) {
      isValid = false;
      errorText = isSpanish 
        ? 'Introduce un formato de correo válido.' 
        : 'Please enter a valid email format.';
    } else if (rules.max && val.length > rules.max) {
      isValid = false;
      errorText = isSpanish 
        ? `Límite superado (máx. ${rules.max} caracteres).` 
        : `Limit exceeded (max ${rules.max} chars).`;
    }

    const errorContainer = document.getElementById(`${input.id}-error`);

    if (!isValid) {
      input.classList.add('is-invalid');
      if (errorContainer) {
        errorContainer.textContent = errorText;
        errorContainer.style.display = 'flex';
      }
    } else {
      clearFieldError(input);
    }

    return isValid;
  }

  // Clear single field error state
  function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const errorContainer = document.getElementById(`${input.id}-error`);
    if (errorContainer) {
      errorContainer.style.display = 'none';
      errorContainer.textContent = '';
    }
  }

  // Show generic form error banner
  function showGeneralError(msg) {
    if (formErrorAlert) {
      formErrorAlert.textContent = msg;
      formErrorAlert.style.display = 'block';
      formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      alert(msg);
    }
  }

  // Toggle button loading locks
  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      if (submitSpinner) submitSpinner.style.display = 'inline-block';
      if (submitText) {
        submitText.textContent = isSpanish ? 'Enviando...' : 'Sending...';
      }
    } else {
      submitBtn.disabled = false;
      if (submitSpinner) submitSpinner.style.display = 'none';
      if (submitText) {
        submitText.textContent = isSpanish ? 'Enviar presentación' : 'Send introduction';
      }
    }
  }
});
