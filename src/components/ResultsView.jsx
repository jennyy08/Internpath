import { motion } from 'framer-motion'
import { projects } from '../data/projects'

export default function ResultsView({ result }) {
  const matchedProjects = result.rankedProjects
    .map(rec => ({
      ...projects.find(p => p.id === rec.id),
      reason: rec.reason
    }))
    .filter(Boolean)

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Role + skill gap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Detected Role</span>
          <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/30">
            {result.detectedRole.replace(/-/g, ' ')}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Skill Gap</span>
          <div className="flex flex-wrap gap-2">
            {result.skillGap.has.map(skill => (
              <span key={skill} className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500/30">
                ✓ {skill}
              </span>
            ))}
            {result.skillGap.missing.map(skill => (
              <span key={skill} className="bg-red-500/20 text-red-300 text-xs px-3 py-1 rounded-full border border-red-500/30">
                ✗ {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchedProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm hover:bg-white/8 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{project.title}</h3>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                project.difficulty === 'simple'
                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                  : project.difficulty === 'medium'
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              }`}>
                {project.difficulty}
              </span>
            </div>
            <p className="text-zinc-400 text-sm">{project.shortDescription}</p>
            <p className="text-zinc-500 text-xs italic">"{project.reason}"</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.skillsDemonstrated?.slice(0, 3).map(skill => (
                <span key={skill} className="bg-white/5 text-zinc-400 text-xs px-2 py-1 rounded-lg border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  )
}