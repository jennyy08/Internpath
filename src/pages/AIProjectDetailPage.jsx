import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { generateFullAIProjectSpec } from '../lib/ai'

export default function AIProjectDetailPage() {
  const location = useLocation()
  const basicProject = location.state?.aiProject

  const [fullProject, setFullProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!basicProject) {
      setLoading(false)
      return
    }

    async function fetchFullSpec() {
      const spec = await generateFullAIProjectSpec(basicProject)
      setFullProject({ ...basicProject, ...spec })
      setLoading(false)
    }

    fetchFullSpec()
  }, [])

  if (!basicProject) {
    return (
      <div className="min-h-screen bg-[#0d0d14] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400">This project link has expired. Please search again.</p>
        <Link to="/" className="text-purple-400 hover:underline">Back to home</Link>
      </div>
    )
  }

  const difficultyColor = {
    simple: 'bg-green-500/20 text-green-300 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-300 border-red-500/30'
  }[basicProject.difficulty]

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full opacity-15 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full opacity-15 blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link to="/" className="font-bold text-lg tracking-tight">InternPath</Link>
        <Link to="/" className="text-sm text-zinc-400 hover:text-white transition-colors">← Back to recommendations</Link>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 flex flex-col gap-10">

        {/* Header — shows immediately from basic data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
              ✦ AI Generated
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${difficultyColor}`}>
              {basicProject.difficulty}
            </span>
            {basicProject.estimated_hours && (
              <span className="text-xs text-zinc-500">~{basicProject.estimated_hours} hours</span>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{basicProject.title}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">{basicProject.short_description}</p>
        </motion.div>

        {/* Loading state for the rest */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-zinc-500 text-sm">Generating full project breakdown...</p>
          </div>
        )}

        {/* Full spec once it arrives */}
        {fullProject && !loading && (
          <>
            {fullProject.tech_stack && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                  {fullProject.tech_stack.primary?.map(tech => (
                    <span key={tech} className="bg-white/5 text-white text-sm px-3 py-1.5 rounded-lg border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-green-400">MVP Features</span>
                <ul className="flex flex-col gap-2">
                  {fullProject.mvp_features?.map((f, i) => (
                    <li key={i} className="text-zinc-300 text-sm flex gap-2">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Advanced Features</span>
                <ul className="flex flex-col gap-2">
                  {fullProject.advanced_features?.map((f, i) => (
                    <li key={i} className="text-zinc-300 text-sm flex gap-2">
                      <span className="text-purple-400">+</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {fullProject.milestones?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Milestones</span>
                <div className="flex flex-col gap-3">
                  {fullProject.milestones.map((m) => (
                    <div key={m.order} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-4 backdrop-blur-sm">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 text-sm font-semibold">
                        {m.order}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-white text-sm">{m.title}</h4>
                          <span className="text-zinc-500 text-xs">~{m.estimatedHours}h</span>
                        </div>
                        <p className="text-zinc-400 text-sm">{m.description}</p>
                        <p className="text-zinc-500 text-xs italic">Deliverable: {m.deliverable}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {fullProject.common_pitfalls?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex flex-col gap-3"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Common Pitfalls</span>
                <ul className="flex flex-col gap-2">
                  {fullProject.common_pitfalls.map((p, i) => (
                    <li key={i} className="text-zinc-300 text-sm flex gap-2">
                      <span className="text-red-400">⚠</span> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {fullProject.recruiter_signal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 flex flex-col gap-3"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Why Recruiters Care</span>
                <p className="text-zinc-300 text-sm leading-relaxed">{fullProject.recruiter_signal}</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}