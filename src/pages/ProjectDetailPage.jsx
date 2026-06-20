import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setProject(data)
      setLoading(false)
    }
    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d14] text-white flex items-center justify-center">
        <p className="text-zinc-400">Loading...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d0d14] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-400">Project not found.</p>
        <Link to="/" className="text-purple-400 hover:underline">Back to home</Link>
      </div>
    )
  }

  const difficultyColor = {
    simple: 'bg-green-500/20 text-green-300 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-300 border-red-500/30'
  }[project.difficulty]

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600 rounded-full opacity-15 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full opacity-15 blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link to="/" className="font-bold text-lg tracking-tight">InternPath</Link>
        <Link to="/" className="text-sm text-zinc-400 hover:text-white transition-colors">← Back to recommendations</Link>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 flex flex-col gap-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-2">
            {project.is_curated && (
              <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/30">
                ★ Curated
              </span>
            )}
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${difficultyColor}`}>
              {project.difficulty}
            </span>
            <span className="text-xs text-zinc-500">~{project.estimated_hours} hours</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">{project.short_description}</p>
        </motion.div>

        {/* Tech stack */}
        {project.tech_stack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.primary?.map(tech => (
                <span key={tech} className="bg-white/5 text-white text-sm px-3 py-1.5 rounded-lg border border-white/10">
                  {tech}
                </span>
              ))}
            </div>
            {project.tech_stack.alternatives?.length > 0 && (
              <p className="text-zinc-500 text-xs mt-1">Alternatives: {project.tech_stack.alternatives.join(', ')}</p>
            )}
          </motion.div>
        )}

        {/* MVP vs Advanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-green-400">MVP Features</span>
            <ul className="flex flex-col gap-2">
              {project.mvp_features?.map((f, i) => (
                <li key={i} className="text-zinc-300 text-sm flex gap-2">
                  <span className="text-green-400">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Advanced Features</span>
            <ul className="flex flex-col gap-2">
              {project.advanced_features?.map((f, i) => (
                <li key={i} className="text-zinc-300 text-sm flex gap-2">
                  <span className="text-purple-400">+</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Milestones */}
        {project.milestones?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Milestones</span>
            <div className="flex flex-col gap-3">
              {project.milestones.map((m) => (
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

        {/* Pitfalls */}
        {project.common_pitfalls?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 flex flex-col gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">Common Pitfalls</span>
            <ul className="flex flex-col gap-2">
              {project.common_pitfalls.map((p, i) => (
                <li key={i} className="text-zinc-300 text-sm flex gap-2">
                  <span className="text-red-400">⚠</span> {p}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Recruiter signal */}
        {project.recruiter_signal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 flex flex-col gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Why Recruiters Care</span>
            <p className="text-zinc-300 text-sm leading-relaxed">{project.recruiter_signal}</p>
          </motion.div>
        )}

      </div>
    </div>
  )
}