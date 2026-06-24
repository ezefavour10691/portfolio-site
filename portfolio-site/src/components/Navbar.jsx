import { personalInfo } from '../data/portfolioData'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Your name on the left — acts as a logo */}
        <span className="font-semibold text-gray-900 tracking-tight">
          {personalInfo.name}
        </span>

        {/* Navigation links on the right */}
        <div className="flex gap-8">
          <a href="#projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Projects
          </a>
          <a href="#skills" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Skills
          </a>
          <a href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Contact
          </a>
        </div>

      </div>
    </nav>
  )
}