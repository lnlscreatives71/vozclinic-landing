import { LangProvider } from './context/LangContext';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Demo from './components/Demo';
import DesignPartner from './components/DesignPartner';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FounderNote from './components/FounderNote';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen font-body">
        <TopBar />
        <main>
          <Hero />
          <PainPoints />
          <HowItWorks />
          <Features />
          <Demo />
          <DesignPartner />
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
