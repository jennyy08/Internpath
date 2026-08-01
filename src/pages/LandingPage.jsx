import { useState } from 'react'
import { motion } from 'framer-motion'
import { analyzeUserInput } from '../lib/ai'
import ResultsView from '../components/ResultsView'
import IntakeForm from '../components/IntakeForm'

export default function LandingPage({ result, setResult, matchedProjects, setMatchedProjects }) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit({ role, level, extraContext }) {
    setLoading(true)
    const input = `Role: ${role}\nLevel: ${level}\n${extraContext ? `Additional context: ${extraContext}` : ''}`
    const data = await analyzeUserInput(input, role, level)
    setResult({ ...data, originalInput: input })
    setLoading(false)
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-[#0d0d14] text-white">

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <span className="font-bold text-lg tracking-tight">InternPath</span>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#get-started" className="hover:text-white transition-colors">Get started</a>
          <a href="#get-started" className="bg-white text-black font-semibold px-4 py-2 rounded-xl hover:bg-zinc-200 transition-colors">
            Try it free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center text-center px-4 pt-56 pb-32 gap-6 overflow-hidden min-h-[90vh] justify-start">
        {/* Spline background */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://my.spline.design/motiontrailscopycopy-0G4D821wycoXdSrMayvfUVxR/"
            className="w-full h-full border-none"
            title="background animation"
          />
          {/* Hides the "Built with Spline" watermark bottom right */}
          <div className="absolute bottom-0 right-0 w-48 h-12 bg-[#0d0d14]" />
          {/* Bottom fade into rest of page */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d0d14] to-transparent" />
        </div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold px-4 py-1.5 rounded-full"
        >
          Build real things. Learn by doing.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 text-6xl font-bold tracking-tight max-w-2xl leading-tight"
        >
          InternPath
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 text-zinc-400 text-xl max-w-xl leading-relaxed"
        >
          InternPath analyzes your goals and recommends real projects that grow your skills and get you hired.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          href="#get-started"
          className="relative z-10 bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-zinc-200 transition-colors text-sm mt-2"
        >
          Get started →
        </motion.a>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative z-10 flex flex-col items-center px-4 py-20 gap-12">
        <div className="text-center flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">How it works</span>
          <h2 className="text-3xl font-bold">Three steps to a stronger portfolio</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
          {[
            { step: '01', title: 'Describe your goals', desc: 'Tell us what role you want and what you already know. Paste a job posting or just write freely.' },
            { step: '02', title: 'Get matched projects', desc: 'We analyze your skill gap and recommend hand-curated projects ranked for your exact situation.' },
            { step: '03', title: 'Build and grow', desc: "Each project comes with milestones, a suggested stack, and recruiter framing so you know what you're building toward." },
          ].map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 backdrop-blur-sm"
            >
              <span className="text-red-400 font-bold text-sm">{step}</span>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Get started / intake */}
      <section id="get-started" className="relative z-10 flex flex-col items-center px-4 py-20 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center flex flex-col gap-3"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Get started</span>
          <h2 className="text-3xl font-bold">What are you going for?</h2>
          <p className="text-zinc-400">Describe your target role and current skills. Be as specific or vague as you want.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <IntakeForm onSubmit={handleSubmit} loading={loading} />
        </motion.div>
      </section>

      {/* Results */}
      {result && (
        <section id="results" className="relative z-10 flex flex-col items-center px-4 pb-20 gap-8">
          <div className="text-center flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Your recommendations</span>
            <h2 className="text-3xl font-bold">Here's what to build</h2>
          </div>
          <div className="w-full max-w-4xl">
            <ResultsView result={result} matchedProjects={matchedProjects} setMatchedProjects={setMatchedProjects} />
          </div>
        </section>
      )}

    </div>
  )
}