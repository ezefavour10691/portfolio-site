import { personalInfo } from '../data/portfolioData'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto w-full">

        <p className="text-sm text-gray-400 tracking-widest uppercase mb-4">
          Available for work
        </p>

        <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-4">
          {personalInfo.name}
        </h1>

        <h2 className="text-3xl font-light text-indigo-500 mb-6">
          {personalInfo.title}
        </h2>

        <p className="text-lg text-gray-500 max-w-xl mb-10 leading-relaxed">
          {personalInfo.tagline}
        </p>

        <div className="flex gap-4 flex-wrap">
          <a href="#projects" className="px-6 py-3 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
            View My Work
          </a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-gray-400 transition-colors">
            GitHub
          </a>
          <a href="#contact" className="px-6 py-3 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-gray-400 transition-colors">
            Contact Me
          </a>
        </div>

      </div>
    </section>
  )
}