import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <ChatWidget />
    </div>
  )
}