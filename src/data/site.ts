export const profile = {
  name: 'Saw Lwin Htoo',
  handle: 'Finn',
  city: 'Singapore',
  photo: '/portrait.jpg?v=3',
  github: 'https://github.com/Gooniez3',
  githubName: '@Gooniez3',
  linkedin: 'https://www.linkedin.com/in/saw-lwin-htoo-664447415/',
  email: 'kokosaw804@gmail.com',
  role: 'Full-Stack Developer · Singapore',
  line: 'I build products from idea to production — combining thoughtful interfaces, scalable backends, databases, cloud infrastructure, and AI-powered features. I’m a continuous learner who enjoys solving problems, exploring new technologies, and using AI alongside my engineering skills to turn ideas into real, useful software.',
  focus: 'Full-Stack Development · AI Engineering · Cloud · Product Development',
  openTo: 'Full-time Software Engineering roles',
  gpa: '8.8 / 9',
}

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'what-i-can-do', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
]

export const marquee = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'ASP.NET Core',
  'PostgreSQL',
  'MongoDB',
  'LangGraph',
  'RAG',
  'pgvector',
  'Prisma',
  'Socket.IO',
  'AWS',
  'Docker',
  'Vercel',
  'Cloudflare',
  'Groq',
  'Gemini',
  'OpenRouter',
]

export const graph = {
  nodes: [
    { id: 'FRONTEND', x: 18, y: 30, accent: false },
    { id: 'BACKEND', x: 46, y: 14, accent: false },
    { id: 'APIS', x: 62, y: 38, accent: false },
    { id: 'AI', x: 80, y: 18, accent: true },
    { id: 'LLMS', x: 86, y: 48, accent: true },
    { id: 'DATA', x: 40, y: 58, accent: false },
    { id: 'RAG', x: 68, y: 62, accent: true },
    { id: 'CLOUD', x: 20, y: 74, accent: false },
    { id: 'IOT', x: 54, y: 84, accent: false },
  ],
  edges: [
    ['FRONTEND', 'BACKEND'],
    ['FRONTEND', 'CLOUD'],
    ['BACKEND', 'APIS'],
    ['APIS', 'AI'],
    ['AI', 'LLMS'],
    ['APIS', 'DATA'],
    ['DATA', 'RAG'],
    ['LLMS', 'RAG'],
    ['DATA', 'CLOUD'],
    ['CLOUD', 'IOT'],
  ] as [string, string][],
}

export const projects = [
  {
    id: 'capytech',
    n: '01',
    name: 'CapyTech POS',
    kicker: 'Live client · computer accessories shop',
    status: 'In production on the shop PC',
    blurb: 'Checkout, variants, inventory, invoices — on the shop PC, not a cloud SaaS.',
    points: [
      { label: 'Database prices', text: 'Server recomputes prices from PostgreSQL. The browser never chooses the sell price.' },
      { label: 'No double-sell', text: 'Row-level stock locks and idempotent charges. A retry cannot double-sell.' },
      { label: 'Phone scanner', text: 'Phone camera on shop Wi-Fi sends barcodes to the till over Socket.IO.' },
      { label: 'Local backup', text: 'USB backup of Postgres + product photos. Profit reports are net of tax.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'PostgreSQL', 'Socket.IO'],
    repo: 'https://github.com/Gooniez3/capytech-pos',
    live: null as string | null,
    image: '/work/capy-till.png',
    gallery: ['/work/capy-dashboard.png', '/work/capy-reports.png'],
  },
  {
    id: 'studymate',
    n: '02',
    name: 'StudyMate AI',
    kicker: 'Live product',
    status: 'studymateai.app',
    blurb: 'LangGraph picks the job — chat, PDF RAG, search, planner, quiz — then streams the answer.',
    points: [
      { label: 'LangGraph routing', text: 'Picks a workflow: chat, PDF RAG, web search, planner, exam revision, quiz, or assignment.' },
      { label: 'RAG with pages', text: 'Page-aware PDF chunks, Cloudflare embeddings, and PostgreSQL pgvector.' },
      { label: 'Real streaming', text: 'Groq, Gemini, or OpenRouter with role-aware fallback and live token streaming.' },
      { label: 'Saved sessions', text: 'Google OAuth, persistent chats, Tavily search, and checkpointed agent state.' },
    ],
    stack: ['Next.js', 'TypeScript', 'LangGraph', 'PostgreSQL', 'pgvector', 'Groq'],
    repo: 'https://github.com/Gooniez3/studymate-ai',
    live: 'https://studymateai.app',
    image: '/work/study-login.png',
    gallery: ['/work/study-quiz.png', '/work/study-rag.png'],
  },
  {
    id: 'dairy',
    n: '03',
    name: 'Dairy Flat Air',
    kicker: 'Live booking platform',
    status: 'dairy-flat-air-booking.vercel.app',
    blurb: 'Its own timetable, seats, and fares. Search, book, look up, and cancel — no account.',
    points: [
      { label: 'Honest search', text: 'No service, sold out, or outside the horizon — then it suggests the next flight.' },
      { label: 'Real timezones', text: 'IANA timezones so Auckland, Sydney, and Chatham Islands stay correct across daylight saving.' },
      { label: 'Safe schedules', text: 'Idempotent rolling schedule generation. Existing bookings are never wiped.' },
      { label: 'Full booking flow', text: 'One-way and return, fare breakdown with GST, cancel from a booking reference.' },
    ],
    stack: ['Next.js', 'TypeScript', 'MongoDB Atlas', 'Mongoose', 'Vercel'],
    repo: 'https://github.com/Gooniez3/dairy-flat-air-booking',
    live: 'https://dairy-flat-air-booking.vercel.app',
    image: '/work/dairy-flat.jpg',
    gallery: [] as string[],
  },
  {
    id: 'portfolio',
    n: '04',
    name: 'Finn Portfolio',
    kicker: 'Personal site',
    status: 'finn-portfolio-blush.vercel.app',
    blurb: 'The site you are on — selected work in 3D, scroll motion, and Finn AI that answers from the real shipped systems.',
    points: [
      { label: 'Real case notes', text: 'CapyTech, StudyMate, and Dairy Flat Air with actual screenshots — not placeholder mockups.' },
      { label: '3D work gallery', text: 'Coverflow on desktop, stacked cards on mobile. Selected shots stay uncropped.' },
      { label: 'Finn AI', text: 'A drawer that answers from the POS, the AI app, the booking system, education, and GitHub.' },
      { label: 'Motion, not noise', text: 'Scroll reveals, magnetic buttons, and a cursor spotlight — all off if you prefer reduced motion.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lenis'],
    repo: 'https://github.com/Gooniez3/Finn-portfolio',
    live: 'https://finn-portfolio-blush.vercel.app',
    image: '/work/finn-site.png',
    gallery: [] as string[],
  },
]

export const experience = [
  {
    n: '01',
    when: 'Education',
    title: 'Computing education',
    place: 'PSB Academy → Massey University',
    body: 'Diploma in InfoComm Technology at PSB Academy (Jan 2025), then a Bachelor of Information Sciences at Massey University — double major in Computer Science and Information Technology, 8.8 / 9 GPA (NZ grading system), conferred August 2026.',
  },
  {
    n: '02',
    when: 'Projects',
    title: 'Software projects',
    place: 'Shipped systems',
    body: 'Turned coursework into products people use — a shop till, a live AI learning workspace, a regional airline booking platform, and this site, plus IoT and cloud work along the way.',
  },
  {
    n: '03',
    when: 'Craft',
    title: 'Full-stack engineering',
    place: 'Interface → API → data → deploy',
    body: 'Interfaces, APIs, databases, and deployment pipelines — complete products rather than isolated features. React/Next on the front, Node or .NET underneath, Postgres or Mongo as the record.',
  },
  {
    n: '04',
    when: 'AI',
    title: 'AI engineering',
    place: 'LangGraph · RAG · streaming',
    body: 'RAG pipelines, LangGraph agents, vector search, and document intelligence. IBM certified in RAG & Agentic AI and DevOps & Software Engineering. StudyMate is the live proof.',
  },
  {
    n: '05',
    when: '2025 — Present',
    title: 'Freelance development',
    place: 'Singapore',
    body: 'Delivering real client work — including CapyTech POS, a production point-of-sale and retail system running daily on a computer accessories shop PC. StudyMate AI, Dairy Flat Air, and this portfolio are live on the public internet.',
  },
  {
    n: '06',
    when: 'Now',
    title: 'Next opportunity',
    place: 'Open to roles',
    body: 'Open to full-time software engineering and focused freelance builds where design sense and engineering depth both matter.',
  },
]

export const certs = [
  {
    name: 'IBM RAG and Agentic AI',
    href: '/certs/ibm-rag.pdf',
  },
  {
    name: 'IBM DevOps and Software Engineering',
    href: '/certs/ibm-devops.pdf',
  },
]

export const skills = {
  Frontend: ['React', 'Next.js', 'Vite', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  Backend: ['C#', 'ASP.NET Core', 'Python', 'FastAPI', 'Node.js', 'Express', 'REST APIs'],
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Kotlin', 'SQL', 'Haskell'],
  Data: ['PostgreSQL', 'MongoDB', 'Oracle SQL', 'MySQL', 'Prisma', 'Entity Framework Core', 'pgvector'],
  'AI / LLM': ['LangChain', 'LangGraph', 'RAG', 'LLMs', 'AI Agents', 'Vector Search', 'Embeddings', 'Gemini', 'Groq', 'OpenRouter'],
  'Cloud / DevOps': ['AWS', 'Cloud Computing', 'Cloudflare', 'Vercel', 'Git', 'GitHub', 'GitHub Actions', 'Docker', 'CI/CD'],
  IoT: ['Raspberry Pi', 'IoT Systems', 'Cloud-Connected IoT'],
}

export const aiCards = [
  {
    n: '01',
    title: 'LangGraph workflows',
    body: 'StudyMate does not dump every prompt into one model call. A router chooses a graph: chat, document, web, planner, revision, quiz, or assignment — then checkpoints state.',
  },
  {
    n: '02',
    title: 'PDF RAG that cites pages',
    body: 'Uploads are chunked with page numbers, embedded on Cloudflare Workers AI, and retrieved from PostgreSQL pgvector. Answers can point back at the source page.',
  },
  {
    n: '03',
    title: 'Providers that actually stream',
    body: 'Groq, Gemini, and OpenRouter with role-aware fallback. Tokens stream to the UI. If one provider dies, the session does not.',
  },
]

export const capabilities = [
  {
    n: '01',
    kicker: 'Full-stack',
    title: 'Product, not a layer',
    body: 'Building and shipping functional systems end to end — React/Next on the front, Node or Next APIs underneath, Postgres or Mongo as the record — with a focus on money, stock, bookings, and the messy production details.',
    tags: ['React', 'Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma', 'Socket.IO'],
  },
  {
    n: '02',
    kicker: 'AI engineering',
    title: 'Agents with a job',
    body: 'LangGraph workflows, PDF RAG with page-aware chunks, and real token streaming. StudyMate is live — not a chatbot glued onto a form.',
    tags: ['LangGraph', 'RAG', 'pgvector', 'Groq', 'Gemini', 'Cloudflare'],
  },
  {
    n: '03',
    kicker: 'Production',
    title: 'Used in the real world',
    body: 'A shop till that cannot double-sell. A booking system that does not lie about timezones. Idempotent charges, stock locks, USB backup, IANA schedules.',
    tags: ['Idempotency', 'Row locks', 'IANA TZ', 'Vercel', 'Docker'],
  },
]

export const currently = [
  { title: 'Building', detail: 'Production full-stack and AI products' },
  { title: 'Exploring', detail: 'Agentic workflows and RAG' },
  { title: 'Open to', detail: 'Full-time software engineering roles' },
]

export const stats = [
  { label: 'Massey GPA', value: '8.8/9' },
  { label: 'Shipped products', value: '4' },
  { label: 'IBM certificates', value: '2' },
]

export const education = [
  {
    kicker: 'Bachelor',
    name: 'Massey University',
    detail: 'Bachelor of Information Sciences — Computer Science + Information Technology. 8.8 / 9 GPA (NZ grading). Conferred August 2026.',
  },
  {
    kicker: 'Diploma',
    name: 'PSB Academy',
    detail: 'Diploma in InfoComm Technology. Awarded January 2025.',
  },
]

export const tech = [
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'React', slug: 'react', color: '61DAFB' },
  { name: 'Next.js', slug: 'nextdotjs', color: 'ffffff' },
  { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1' },
  { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
  { name: 'Python', slug: 'python', color: '3776AB' },
  { name: 'Tailwind', slug: 'tailwindcss', color: '06B6D4' },
  { name: 'Prisma', slug: 'prisma', color: '2D3748' },
  { name: 'Docker', slug: 'docker', color: '2496ED' },
  { name: 'AWS', slug: 'amazonaws', color: 'FF9900' },
  { name: 'LangChain', slug: 'langchain', color: '1C3C3C' },
]
