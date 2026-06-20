import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ProjectDetailPage from './pages/ProjectDetailPage'

export default function App() {
  const [result, setResult] = useState(null)
  const [matchedProjects, setMatchedProjects] = useState([])

  return (
    <Routes>
      <Route path="/" element={
        <LandingPage
          result={result}
          setResult={setResult}
          matchedProjects={matchedProjects}
          setMatchedProjects={setMatchedProjects}
        />
      } />
      <Route path="/project/:id" element={<ProjectDetailPage />} />
    </Routes>
  )
}