# InternPath

A web platform that helps high school and university students get their first internship by recommending structured, job-specific projects and the skills needed to build them.

---

## What it does

Most students don't know what to build for their portfolio. InternPath fixes that.

You pick a role (Software Engineer, ML Engineer, UX Design, etc.) and your experience level. InternPath analyzes your background, identifies your skill gaps, and recommends a ranked list of real, buildable projects — each framed through a recruiter's lens so you know exactly what signal each project sends to a hiring manager.

Every project comes with:
- MVP vs advanced features
- Suggested tech stack with alternatives
- Ordered milestones with time estimates and deliverables
- Common pitfalls to avoid
- A recruiter signal paragraph explaining what the project tells a hiring manager

---

## How it works

**Hybrid recommendation system** — projects come from two sources:

1. **Curated catalog** (37 projects across 8 roles): Hand-written project specs stored in a Supabase database. These are deeply researched, recruiter-lens framed, and cover simple through advanced difficulty.

2. **AI-generated suggestions**: When the curated catalog doesn't have enough matches, Claude generates additional project ideas on the fly, clearly labeled as AI-suggested so users know the difference.

**Intake flow** — the user picks a role and experience level (no typing required), with an optional free-text field for extra context. This structured input makes recommendations significantly more accurate than open-ended prompts.

**One structured AI call** — a single call to the Claude API parses the user's input and returns a JSON object with detected role, skill gap analysis, and ranked project IDs from the curated catalog. No chatbot, no back-and-forth.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, Framer Motion |
| AI | Anthropic Claude API (claude-sonnet-4-6) |
| Database | Supabase (PostgreSQL) |
| Routing | React Router |

---

## Key design decisions

**The AI never writes code for the user.** The co-builder feature (if built) is deliberately constrained to explain, unblock, and review — never to output a finished implementation. This is a named product decision: the whole point is forcing real skill-building, so an AI that does the work defeats the purpose.

**Curated over generated.** Most "project idea generators" just wrap an LLM. InternPath's curated catalog is what makes it different — every project spec is carefully written with realistic scope, recruiter framing, and common pitfalls from real experience. The AI fills gaps, it doesn't replace the catalog.

**Structured intake over freeform.** Role and level are required, free text is optional. This makes the first-time experience frictionless (two clicks, no blank page anxiety) while still allowing nuance for users who want to add context.

---

## Project structure

```
src/
  components/
    IntakeForm.jsx      # Role + level picker with animated steps
    ResultsView.jsx     # Recommendation grid with curated/AI badges
  pages/
    LandingPage.jsx     # Hero, how it works, intake form, results
    ProjectDetailPage.jsx    # Full spec for curated projects
    AIProjectDetailPage.jsx  # On-demand full spec for AI projects
  lib/
    ai.js               # Claude API calls (analyze input, generate projects, expand specs)
    supabase.js         # Supabase client
    projects.js         # Project fetch helpers
  data/
    projects.js         # Legacy local project data (replaced by Supabase)
```

---

## Running locally

**Prerequisites:** Node.js 18+, a Supabase account, an Anthropic API key

```bash
git clone https://github.com/yourusername/internpath
cd internpath
npm install
```

Create a `.env` file in the root:

```
VITE_ANTHROPIC_API_KEY=your-anthropic-key
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

```bash
npm run dev
```

Open `localhost:5173`.

**Database setup:** The Supabase schema and seed data are included in `/supabase/schema.sql` and `/supabase/seed.sql`. Run these in your Supabase SQL editor to populate the project catalog.

---

## Roadmap

- [ ] Add curated projects for Frontend Engineer, Backend Engineer, and ML Engineer roles
- [ ] Project detail page for AI-generated projects persists on refresh
- [ ] Co-builder panel: scoped AI chat anchored to one project and one milestone, constrained to explain/unblock/review — never to generate full implementations
- [ ] Deployment with a small backend so the API key moves server-side

