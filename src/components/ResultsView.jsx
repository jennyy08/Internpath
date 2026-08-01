import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getProjectsByIds } from '../lib/projects'
import { generateAIProjects } from '../lib/ai'
import { Link } from 'react-router-dom'

export default function ResultsView({ result, matchedProjects, setMatchedProjects }) {

  useEffect(() => {
    setMatchedProjects([])
    
    async function fetchProjects() {
      const ids = result.rankedProjects.map(r => r.id).slice(0, 3)
      const fetched = await getProjectsByIds(ids)
      const withReasons = fetched.map(project => ({
        ...project,
        reason: result.rankedProjects.find(r => r.id === project.id)?.reason
      }))
      const aiNeeded = 5 - withReasons.length
      const aiProjects = await generateAIProjects(
        result.originalInput || '',
        result.detectedRole,
        withReasons.length,
        aiNeeded
      )
      setMatchedProjects([...withReasons, ...aiProjects])
    }

    fetchProjects()
  }, [result])

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
          <span className="bg-red-500/20 text-red-300 text-xs font-semibold px-3 py-1 rounded-full border border-red-500/30">
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

      {/* Learning path */}
      {result.learningPath?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 backdrop-blur-sm"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">What to learn first</span>
          <div className="flex flex-col gap-3">
            {result.learningPath.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-300 text-xs font-semibold mt-0.5">
                  {i + 1}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold">{item.skill}</span>
                    <span className="bg-white/5 text-zinc-500 text-xs px-2 py-0.5 rounded-lg border border-white/10">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-xs">{item.why}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchedProjects.map((project, i) => (
          <Link
              key={project.id}
              to={project.is_curated ? `/project/${project.id}` : `/project/ai/${project.id}`}
              state={!project.is_curated ? { aiProject: project } : undefined}
            >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm hover:bg-white/8 transition-colors cursor-pointer h-full"
            >
            <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-white">{project.title}</h3>
            <div className="flex items-center gap-2">
                {project.is_curated ? (
                <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/30">
                    ★ Curated
                </span>
                ) : (
                <span className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-3 py-1 rounded-full border border-sky-500/30">
                    ⚡ AI Generated
                </span>
                )}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                project.difficulty === 'simple'
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : project.difficulty === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-300/30'
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                }`}>
                {project.difficulty}
                </span>
            </div>
            </div>
            <p className="text-zinc-400 text-sm">{project.short_description}</p>
            <p className="text-zinc-500 text-xs italic">"{project.reason}"</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {project.skills_demonstrated?.slice(0, 3).map(skill => (
                <span key={skill} className="bg-white/5 text-zinc-400 text-xs px-2 py-1 rounded-lg border border-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}