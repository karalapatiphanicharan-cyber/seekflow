import Home from './pages/Home'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
