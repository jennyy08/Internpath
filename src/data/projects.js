export const projects = [
  {
    id: "personal-finance-tracker",
    title: "Personal Finance Tracker",
    shortDescription: "A dashboard to track income and expenses with charts.",
    targetRoles: ["software-engineer"],
    difficulty: "simple",
    estimatedHours: 20,
    skillsDemonstrated: ["CRUD operations", "Authentication", "Data visualization", "Frontend/backend integration"],
    prerequisites: ["Basic JavaScript", "Some React or any frontend framework", "Basic understanding of REST APIs"],
    techStack: {
      primary: ["React", "Node.js/Express", "PostgreSQL", "Chart.js"],
      alternatives: ["Vue instead of React", "Supabase instead of Express + Postgres"]
    },
    mvpFeatures: [
      "Add, edit, delete income and expense entries",
      "Categorize transactions (food, rent, salary, etc.)",
      "Dashboard with a bar or pie chart breakdown by category",
      "Simple login/signup so data is per user"
    ],
    advancedFeatures: [
      "Monthly summaries and trends over time",
      "Budget goals with progress bars",
      "CSV export of transactions",
      "Recurring transaction support"
    ],
    milestones: [
      { order: 1, title: "Database + API", description: "Set up your database schema and build REST endpoints for transactions.", estimatedHours: 6, deliverable: "You can add and retrieve transactions via Postman or curl" },
      { order: 2, title: "Auth", description: "Add signup/login so each user only sees their own data.", estimatedHours: 4, deliverable: "Protected routes, JWT or session-based auth working" },
      { order: 3, title: "Frontend — transaction UI", description: "Build the form to add transactions and a list view to see them.", estimatedHours: 5, deliverable: "User can add and see their transactions in the browser" },
      { order: 4, title: "Dashboard + charts", description: "Add a summary view with charts breaking down spending by category.", estimatedHours: 5, deliverable: "A visual dashboard that updates as transactions are added" }
    ],
    commonPitfalls: [
      "Skipping auth and storing everything globally — makes the project feel like a toy",
      "Over-engineering the category system before the basics work",
      "Using too many charting libraries at once — pick one and go deep"
    ],
    recruiterSignal: "This project tells a hiring manager you can build a complete product loop: database schema, backend API, authentication, and a frontend that visualizes real data. CRUD sounds basic but doing it cleanly with proper auth and a polished UI is what most students don't finish. Completing this says you ship.",
    tags: ["fullstack", "auth", "charts", "CRUD", "beginner-friendly"]
  },
  {
    id: "weather-dashboard",
    title: "Weather Dashboard",
    shortDescription: "Pulls live forecasts from a public API and displays them with a clean UI.",
    targetRoles: ["software-engineer"],
    difficulty: "simple",
    estimatedHours: 12,
    skillsDemonstrated: ["API integration", "Async JavaScript", "UI design", "Data fetching"],
    prerequisites: ["Basic JavaScript", "Basic HTML/CSS", "Comfort reading API docs"],
    techStack: {
      primary: ["React", "OpenWeatherMap API", "Chart.js"],
      alternatives: ["Vanilla JS instead of React", "WeatherAPI.com as alternative data source"]
    },
    mvpFeatures: [
      "Search any city and get current weather",
      "5-day forecast display",
      "Temperature, humidity, wind speed shown clearly",
      "Clean responsive layout"
    ],
    advancedFeatures: [
      "Hourly forecast chart",
      "Save favourite cities",
      "Weather-based background or theme changes",
      "Geolocation to auto-detect user location"
    ],
    milestones: [
      { order: 1, title: "API setup", description: "Register for OpenWeatherMap API, test endpoints in Postman, understand the response shape.", estimatedHours: 2, deliverable: "You can fetch weather data for a hardcoded city" },
      { order: 2, title: "Search + current weather", description: "Build a search input and display current conditions for any city.", estimatedHours: 4, deliverable: "Working search that shows live weather" },
      { order: 3, title: "Forecast + polish", description: "Add the 5-day forecast and make the UI actually look good.", estimatedHours: 6, deliverable: "Full dashboard with forecast and clean design" }
    ],
    commonPitfalls: [
      "Not handling API errors — what if the city doesn't exist?",
      "Exposing your API key in the frontend — use environment variables",
      "Making the UI too data-dense — prioritize the most useful info"
    ],
    recruiterSignal: "Simple scope but execution matters here. A polished weather dashboard shows you can read API docs, handle async data, and make something that actually looks good. Most students submit ugly versions — a clean UI instantly stands out.",
    tags: ["API", "async", "frontend", "beginner-friendly"]
  },
  {
    id: "job-application-tracker",
    title: "Job Application Tracker",
    shortDescription: "A Kanban board to track job applications, statuses, and contacts.",
    targetRoles: ["software-engineer"],
    difficulty: "medium",
    estimatedHours: 30,
    skillsDemonstrated: ["Drag-and-drop UI", "Relational data", "State management", "Product thinking"],
    prerequisites: ["React", "Basic backend or Supabase", "Understanding of REST APIs"],
    techStack: {
      primary: ["React", "dnd-kit", "Supabase", "Tailwind"],
      alternatives: ["Firebase instead of Supabase", "react-beautiful-dnd for drag and drop"]
    },
    mvpFeatures: [
      "Kanban columns: Wishlist, Applied, Interview, Offer, Rejected",
      "Add application cards with company, role, date, link",
      "Drag cards between columns",
      "Persist data so it survives refresh"
    ],
    advancedFeatures: [
      "Contact tracker per application",
      "Follow-up reminders",
      "Stats dashboard: response rate, avg time to hear back",
      "Email template snippets"
    ],
    milestones: [
      { order: 1, title: "Data model + backend", description: "Design your applications table and set up Supabase.", estimatedHours: 4, deliverable: "Can create and read applications from the database" },
      { order: 2, title: "Kanban UI", description: "Build the column layout and application cards.", estimatedHours: 8, deliverable: "Visual board with static cards" },
      { order: 3, title: "Drag and drop", description: "Wire up dnd-kit so cards move between columns and persist.", estimatedHours: 8, deliverable: "Dragging works and status updates in the database" },
      { order: 4, title: "Polish + details", description: "Add form to create new applications, delete, edit, nice empty states.", estimatedHours: 10, deliverable: "Fully usable product" }
    ],
    commonPitfalls: [
      "Drag and drop is harder than it looks — budget extra time",
      "Not thinking about the data model upfront — status changes need to be tracked",
      "Building for yourself but forgetting it needs to make sense to a recruiter viewing it"
    ],
    recruiterSignal: "This is meta-clever — you built a tool that every recruiter personally wishes existed. It shows drag-and-drop UI skills, relational data thinking, and product sense. The fact that it's useful to the person looking at your portfolio is a bonus.",
    tags: ["fullstack", "kanban", "drag-and-drop", "product-thinking"]
  },
  {
    id: "url-shortener",
    title: "URL Shortener with Analytics",
    shortDescription: "Generate short links and track clicks by country and device.",
    targetRoles: ["software-engineer"],
    difficulty: "medium",
    estimatedHours: 25,
    skillsDemonstrated: ["Backend logic", "Database indexing", "Analytics", "API design"],
    prerequisites: ["Basic backend (Node/Express or Python/Flask)", "Database basics", "Some frontend"],
    techStack: {
      primary: ["Node.js/Express", "PostgreSQL", "React"],
      alternatives: ["Python/Flask for backend", "PlanetScale or Supabase for database"]
    },
    mvpFeatures: [
      "Paste a long URL, get a short one",
      "Short link redirects correctly",
      "Click counter per link",
      "Simple dashboard showing your links"
    ],
    advancedFeatures: [
      "Click breakdown by country, device, browser",
      "Custom short slugs",
      "Link expiry dates",
      "QR code generation"
    ],
    milestones: [
      { order: 1, title: "Core shortening logic", description: "Build the endpoint that takes a URL and returns a short code, stored in the database.", estimatedHours: 5, deliverable: "POST /shorten works, returns a short URL" },
      { order: 2, title: "Redirect + click tracking", description: "Handle the redirect and log each click with timestamp and metadata.", estimatedHours: 6, deliverable: "Short links redirect, clicks are recorded" },
      { order: 3, title: "Analytics + dashboard", description: "Aggregate click data and display it in a simple frontend.", estimatedHours: 8, deliverable: "Dashboard showing clicks per link over time" },
      { order: 4, title: "Polish", description: "Error handling, rate limiting, nice UI.", estimatedHours: 6, deliverable: "Production-ready feel" }
    ],
    commonPitfalls: [
      "Not thinking about hash collisions — two URLs generating the same short code",
      "Storing too much per click and making analytics queries slow",
      "Skipping rate limiting — your redirect endpoint will get abused"
    ],
    recruiterSignal: "URL shorteners are deceptively interesting backend problems. Collision handling, redirect performance, and analytics aggregation show you think about edge cases and scale. This reads as backend-strong, which is rare for students.",
    tags: ["backend", "analytics", "database", "API-design"]
  },
  {
    id: "real-time-chat",
    title: "Real-Time Chat App",
    shortDescription: "Rooms, online presence, and message history with WebSockets.",
    targetRoles: ["software-engineer"],
    difficulty: "medium",
    estimatedHours: 35,
    skillsDemonstrated: ["WebSockets", "Backend state management", "Database design", "Real-time systems"],
    prerequisites: ["React", "Node.js basics", "Some database experience"],
    techStack: {
      primary: ["React", "Node.js", "Socket.io", "PostgreSQL or Redis"],
      alternatives: ["Supabase Realtime instead of Socket.io", "Firebase for simpler setup"]
    },
    mvpFeatures: [
      "Create and join chat rooms",
      "Send and receive messages in real time",
      "See who's currently online",
      "Message history loads on join"
    ],
    advancedFeatures: [
      "Direct messages",
      "Typing indicators",
      "Read receipts",
      "File/image sharing"
    ],
    milestones: [
      { order: 1, title: "WebSocket server", description: "Set up Socket.io server, handle connect/disconnect events.", estimatedHours: 6, deliverable: "Two browser tabs can exchange messages" },
      { order: 2, title: "Rooms + presence", description: "Add room logic and track who's online in each room.", estimatedHours: 8, deliverable: "Multiple rooms work, online list updates live" },
      { order: 3, title: "Message persistence", description: "Store messages in a database so history loads on join.", estimatedHours: 8, deliverable: "Refresh the page and messages are still there" },
      { order: 4, title: "Frontend polish", description: "Clean chat UI, smooth scrolling, timestamps, user avatars.", estimatedHours: 13, deliverable: "Looks and feels like a real chat app" }
    ],
    commonPitfalls: [
      "Not handling disconnects gracefully — presence gets out of sync",
      "Storing all messages in memory instead of a database",
      "Not thinking about room authorization — anyone can join anything"
    ],
    recruiterSignal: "Real-time systems are genuinely hard and most students avoid them. WebSockets, presence, and message ordering shows you can think about state beyond a simple request/response cycle. This immediately signals backend depth.",
    tags: ["real-time", "websockets", "backend", "fullstack"]
  },
  {
    id: "collaborative-code-editor",
    title: "Collaborative Code Editor",
    shortDescription: "Multiple users editing code simultaneously with syntax highlighting.",
    targetRoles: ["software-engineer"],
    difficulty: "advanced",
    estimatedHours: 60,
    skillsDemonstrated: ["Real-time sync", "Conflict resolution", "Complex architecture", "WebSockets"],
    prerequisites: ["Strong React", "Node.js", "WebSockets experience", "Some algorithms knowledge"],
    techStack: {
      primary: ["React", "CodeMirror or Monaco", "Node.js", "Socket.io", "Y.js (CRDT)"],
      alternatives: ["ShareDB instead of Y.js", "Firebase Realtime Database for simpler sync"]
    },
    mvpFeatures: [
      "Multiple users editing the same document live",
      "Syntax highlighting for at least one language",
      "See other users' cursors",
      "Changes sync within ~100ms"
    ],
    advancedFeatures: [
      "Multiple language support",
      "Chat sidebar",
      "Execution sandbox (run the code)",
      "Document history / undo tree"
    ],
    milestones: [
      { order: 1, title: "Editor setup", description: "Integrate CodeMirror or Monaco into React, get syntax highlighting working.", estimatedHours: 8, deliverable: "A working code editor in the browser" },
      { order: 2, title: "Basic real-time sync", description: "Two users can type and see each other's changes.", estimatedHours: 15, deliverable: "Collaborative editing works for simple cases" },
      { order: 3, title: "Conflict resolution with CRDTs", description: "Integrate Y.js so concurrent edits merge correctly.", estimatedHours: 20, deliverable: "Simultaneous edits never corrupt the document" },
      { order: 4, title: "Cursors + polish", description: "Show other users' cursor positions, add room/session management.", estimatedHours: 17, deliverable: "Feels like a real collaborative editor" }
    ],
    commonPitfalls: [
      "Trying to implement your own conflict resolution — use Y.js, it's a solved problem",
      "Underestimating how complex cursor sync is",
      "Not scoping to MVP — this can expand forever"
    ],
    recruiterSignal: "This is a senior-level problem that most experienced engineers haven't tackled. CRDTs, real-time sync, and conflict resolution in one project signals serious technical depth. If you finish this, lead with it everywhere.",
    tags: ["advanced", "real-time", "CRDTs", "architecture"]
  },
  {
    id: "devops-pipeline",
    title: "DevOps Deployment Pipeline",
    shortDescription: "CI/CD from GitHub push to auto-deploy on a VPS.",
    targetRoles: ["software-engineer"],
    difficulty: "advanced",
    estimatedHours: 40,
    skillsDemonstrated: ["Infrastructure thinking", "CI/CD", "Linux", "Automation"],
    prerequisites: ["Comfortable with the terminal", "Basic Git", "Some backend experience"],
    techStack: {
      primary: ["GitHub Actions", "Docker", "Nginx", "DigitalOcean or Hetzner VPS"],
      alternatives: ["GitLab CI instead of GitHub Actions", "Caddy instead of Nginx"]
    },
    mvpFeatures: [
      "Push to main triggers automatic deployment",
      "Tests run before deploy — failed tests block the deploy",
      "Zero-downtime deployment",
      "Basic monitoring: app is up or down"
    ],
    advancedFeatures: [
      "Staging vs production environments",
      "Rollback on failed deploy",
      "Slack/email notifications on deploy",
      "Log aggregation"
    ],
    milestones: [
      { order: 1, title: "VPS + manual deploy", description: "Rent a VPS, deploy your app manually via SSH so you understand what you're automating.", estimatedHours: 8, deliverable: "App running live on your own server" },
      { order: 2, title: "Dockerize", description: "Containerize the app so the environment is consistent.", estimatedHours: 8, deliverable: "App runs identically in Docker locally and on the server" },
      { order: 3, title: "GitHub Actions pipeline", description: "Write a workflow that runs tests and deploys on push to main.", estimatedHours: 12, deliverable: "git push triggers automatic deployment" },
      { order: 4, title: "Zero-downtime + monitoring", description: "Blue-green or rolling deploy so the app never goes down during updates.", estimatedHours: 12, deliverable: "Deploys without interrupting live traffic" }
    ],
    commonPitfalls: [
      "Skipping the manual deploy step — you need to understand what you're automating",
      "Hardcoding secrets in your GitHub Actions yaml — use GitHub Secrets",
      "Not testing the rollback — what happens when a bad deploy goes out?"
    ],
    recruiterSignal: "Infrastructure thinking is rare in student portfolios. Most candidates can write app code but have no idea how it gets to production. This project immediately signals you think end-to-end, which is exactly what startups need from early engineers.",
    tags: ["devops", "infrastructure", "CI/CD", "advanced"]
  }
]