const SYSTEM_PROMPT = `You are an internship advisor. A student will describe their goals and background.

You must respond with ONLY a JSON object, no other text, in this exact format:
{
  "detectedRole": "software-engineer",
  "skillGap": {
    "has": ["skill1", "skill2"],
    "needs": ["skill3", "skill4"],
    "missing": ["skill3"]
  },
  "rankedProjects": [
    {
      "id": "personal-finance-tracker",
      "reason": "one line reason why this fits them"
    }
  ]
}

detectedRole must be one of: "software-engineer", "data-science", "product-manager", "ux-design", "data-analyst"
rankedProjects must reference real projects from this list: ["personal-finance-tracker", "weather-dashboard", "job-application-tracker", "url-shortener", "real-time-chat", "collaborative-code-editor", "devops-pipeline"]
Return ONLY the JSON, no markdown, no explanation.`

export async function analyzeUserInput(userInput) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userInput
        }
      ]
    })
  })

  const data = await response.json()
  const text = data.content[0].text
  const cleaned = text.replace(/```json|```/g, "").trim()
  return JSON.parse(cleaned)
}

export async function generateAIProjects(userInput, detectedRole, existingCount, needed) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: `You are an internship advisor. Generate exactly ${needed} project recommendations for a student.
      
Return ONLY a JSON array, no other text, like this:
[
  {
    "id": "unique-kebab-case-id",
    "title": "Project Title",
    "short_description": "One sentence description.",
    "difficulty": "simple" | "medium" | "advanced",
    "estimated_hours": 20,
    "skills_demonstrated": ["skill1", "skill2", "skill3"],
    "reason": "One line reason why this fits this specific student.",
    "is_curated": false
  }
]

The projects must be realistic, buildable by a student, and relevant to ${detectedRole}.
Return ONLY the JSON array, no markdown, no explanation.`,
      messages: [
        {
          role: "user",
          content: `Student goal: ${userInput}\nRole: ${detectedRole}\nGenerate ${needed} project ideas.`
        }
      ]
    })
  })

  const data = await response.json()
  const text = data.content[0].text
  const cleaned = text.replace(/```json|```/g, "").trim()
  return JSON.parse(cleaned)
}