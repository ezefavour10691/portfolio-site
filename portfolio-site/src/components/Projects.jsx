import { projects } from '../data/portfolioData'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-gray-400 tracking-widest uppercase mb-2">
          My Work
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  GitHub →
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-500 hover:text-indigo-700 transition-colors">
                  Live Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}