import { skills } from '../data/portfolioData'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-gray-400 tracking-widest uppercase mb-2">
          What I Know
        </p>
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span key={skill} className="px-5 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-indigo-300 hover:text-indigo-600 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}