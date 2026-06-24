import Home from './pages/Home'
import Compare from './pages/Compare'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { useSimulation } from './hooks/useSimulation'
import { useState } from 'react'

function App() {
  const sim = useSimulation();
  const [currentPage, setCurrentPage] = useState<'simulator' | 'compare'>('simulator');

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
          disabled: !sim.result
        }}
      />

      {currentPage === 'simulator' ? (
        <Home sim={sim} />
      ) : (
        <Compare />
      )}

      <Footer />
    </div>
  )
}

export default App
