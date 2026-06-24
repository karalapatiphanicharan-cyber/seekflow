import Home from './pages/Home'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { useSimulation } from './hooks/useSimulation'

function App() {
  const sim = useSimulation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar playback={{
        isPlaying: sim.isPlaying,
        onTogglePlay: sim.togglePlay,
        onReset: sim.resetPlayback,
        onNext: sim.nextStep,
        onPrev: sim.prevStep,
        speed: sim.playbackSpeed,
        onSpeedChange: sim.setPlaybackSpeed,
        disabled: !sim.result
      }} />
      <Home sim={sim} />
      <Footer />
    </div>
  )
}

export default App
