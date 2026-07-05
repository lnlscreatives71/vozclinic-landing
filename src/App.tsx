import { LangProvider } from './context/LangContext';
import type { Lang } from './types/lang';
import AnnouncementBar from './components/AnnouncementBar';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Demo from './components/Demo';
import TrustBand from './components/TrustBand';
import DesignPartner from './components/DesignPartner';
import Calculator from './components/Calculator';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FounderNote from './components/FounderNote';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import SofiaAgent from './components/sofia/SofiaAgent';

export default function App({ initialLang = 'es' }: { initialLang?: Lang }) {
  return (
    <LangProvider initialLang={initialLang}>
      <div className="min-h-screen font-body">
        <AnnouncementBar />
        <TopBar />
        <main>
          <SofiaAgent />
          <Hero />
          <PainPoints />
          <HowItWorks />
          <Features />
          <Demo />
          <TrustBand />
          <DesignPartner />
          <Calculator />
          <Pricing />
          <FAQ />
          <FounderNote />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
