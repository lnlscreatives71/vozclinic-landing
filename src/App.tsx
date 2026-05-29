import { LangProvider } from './context/LangContext';
import AnnouncementBar from './components/AnnouncementBar';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Demo from './components/Demo';
import TrustBand from './components/TrustBand';
import DesignPartner from './components/DesignPartner';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FounderNote from './components/FounderNote';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen font-body">
        <AnnouncementBar />
        <TopBar />
        <main>
          <Hero />
          <PainPoints />
          <HowItWorks />
          <Features />
          <Demo />
          <TrustBand />
          <DesignPartner />
          <Pricing />
          <FAQ />
          <FounderNote />
          <FinalCTA />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LangProvider>
  );
}
