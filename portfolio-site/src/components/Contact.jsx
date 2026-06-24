import { personalInfo } from '../data/portfolioData'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        <p className="text-sm text-gray-400 tracking-widest uppercase mb-2">
          Get In Touch
        </p>

        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Contact
        </h2>

        <p className="text-gray-500 mb-10 max-w-md">
          I'm currently open to frontend roles. Whether you have a question or just want to say hi, my inbox is open!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">

          <a href={`mailto:${personalInfo.email}`}
            className="px-6 py-3 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors text-center">
            Email Me
          </a>

          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-gray-400 transition-colors text-center">
            LinkedIn
          </a>

          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-gray-400 transition-colors text-center">
            GitHub
          </a>

        </div>
      </div>
    </section>
  )
}