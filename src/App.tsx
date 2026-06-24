import Home from './pages/Home'
import Compare from './pages/Compare'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import Disclaimer from './pages/Disclaimer'
import AlgorithmsInfo from './pages/AlgorithmsInfo'
import { Navbar, type Page } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { useSimulation } from './hooks/useSimulation'
import { useState, useEffect } from 'react'

function App() {
  const sim = useSimulation();
  const [currentPage, setCurrentPage] = useState<Page>('simulator');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'simulator':
        return <Home sim={sim} />;
      case 'compare':
        return <Compare />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsConditions />;
      case 'disclaimer':
        return <Disclaimer />;
      case 'algorithms':
        return <AlgorithmsInfo />;
      default:
        return <Home sim={sim} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        playback={{
          isPlaying: sim.isPlaying,
          onTogglePlay: sim.togglePlay,
          onReset: sim.resetPlayback,
          onNext: sim.nextStep,
          onPrev: sim.prevStep,
          speed: sim.playbackSpeed,
          onSpeedChange: sim.setPlaybackSpeed,
          disabled: !sim.result || currentPage !== 'simulator'
        }}
      />

      <div className="flex-1 flex flex-col">
        {renderPage()}
      </div>

      <Footer onPageChange={setCurrentPage} />
    </div>
  )
}

export default App
