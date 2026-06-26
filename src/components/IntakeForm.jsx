import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ROLES = [
  { id: 'software-engineer', label: 'Software Engineer', icon: '💻' },
  { id: 'frontend-engineer', label: 'Frontend Engineer', icon: '🎨' },
  { id: 'backend-engineer', label: 'Backend Engineer', icon: '⚙️' },
  { id: 'ml-engineer', label: 'ML Engineer', icon: '🤖' },
  { id: 'data-science', label: 'Data Science', icon: '📊' },
  { id: 'product-manager', label: 'Product Manager', icon: '📋' },
  { id: 'ux-design', label: 'UX Design', icon: '✏️' },
  { id: 'data-analyst', label: 'Data Analyst', icon: '📈' },
  { id: 'not-sure', label: 'Not Sure', icon: '🤷' },
]

const LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'Little to no experience' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Some projects or coursework' },
  { id: 'advanced', label: 'Advanced', desc: 'Solid experience, want a challenge' },
]

export default function IntakeForm({ onSubmit, loading }) {
  const [selectedRole, setSelectedRole] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [extraContext, setExtraContext] = useState('')

  function handleSubmit() {
    if (!selectedRole || !selectedLevel) return
    onSubmit({ role: selectedRole, level: selectedLevel, extraContext })
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">

      {/* Role picker */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">What role are you going for?</span>
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                selectedRole === role.id
                  ? 'bg-purple-500/20 border-purple-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/8 hover:text-white'
              }`}
            >
              <span className="text-xl">{role.icon}</span>
              <span className="text-xs text-center leading-tight">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Level picker — slides in after role selected */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">What's your experience level?</span>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`flex flex-col gap-1 p-4 rounded-xl border text-left transition-all ${
                    selectedLevel === level.id
                      ? 'bg-purple-500/20 border-purple-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="text-sm font-semibold">{level.label}</span>
                  <span className="text-xs text-zinc-500">{level.desc}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional context — slides in after level selected */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Anything else? <span className="text-zinc-600 normal-case font-normal">(optional)</span>
            </span>
            <div
              className="w-full rounded-2xl p-px"
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(99,102,241,0.4), rgba(59,130,246,0.4))'
              }}
            >
              <div className="w-full bg-[#13131f] rounded-2xl p-4 flex flex-col gap-4">
                <textarea
                  value={extraContext}
                  onChange={(e) => setExtraContext(e.target.value)}
                  placeholder="e.g. I know some React, I want to work at a startup, I've done one hackathon..."
                  rows={3}
                  className="w-full bg-transparent text-white placeholder-zinc-500 resize-none outline-none text-sm leading-relaxed"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="self-end bg-white text-black font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Get Recommendations →'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}