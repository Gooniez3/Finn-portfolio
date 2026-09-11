type Entry = { keys: string[]; answer: string }

const knowledge: Entry[] = [
  {
    keys: ['who', 'about', 'himself', 'bio', 'introduce', 'introduction', 'finn', 'name', 'saw', 'htoo'],
    answer:
      "Saw Lwin Htoo — friends call him Finn. He's a full-stack developer in Singapore. He builds products from idea to production: thoughtful interfaces, scalable backends, databases, cloud, and AI-powered features. He's a continuous learner who uses AI alongside engineering to turn ideas into useful software. Proof: CapyTech POS in a real shop, StudyMate AI at studymateai.app, and Dairy Flat Air on Vercel.",
  },
  {
    keys: ['hire', 'job', 'role', 'fit', 'why', 'recruiter', 'strength', 'opportunity', 'open'],
    answer:
      "Hire him if you want someone who owns a whole product, not a single layer. He has shipped a live client POS (money, stock, invoices), a production AI app with LangGraph + RAG, and a deployed booking system with timezone-aware scheduling. Diploma in InfoComm Technology (PSB Academy), then Massey BInfSc — CS + IT — 8.8 / 9 GPA, plus IBM certs in RAG & Agentic AI and DevOps. Based in Singapore, open to full-time software engineering and focused freelance work.",
  },
  {
    keys: ['where', 'location', 'singapore', 'based', 'city'],
    answer:
      "He's based in Singapore and open to roles from there. GitHub is @Gooniez3. LinkedIn: linkedin.com/in/saw-lwin-htoo-664447415/",
  },
  {
    keys: ['skill', 'stack', 'tech', 'language', 'typescript', 'python', 'react', 'next'],
    answer:
      "Languages: TypeScript, JavaScript, Python, Java, C#, C++, Kotlin, SQL, Haskell. Frontend: React, Next.js, Vite, Tailwind, HTML, CSS. Backend: Node, Express, FastAPI, ASP.NET Core, REST APIs. Data: PostgreSQL, MongoDB, MySQL, Oracle SQL, Prisma, Entity Framework, pgvector. AI: LangGraph, LangChain, RAG, agents, Groq, Gemini, OpenRouter. Cloud: AWS, Docker, Vercel, Cloudflare, GitHub Actions. Also Raspberry Pi / IoT. The through-line is TypeScript full-stack plus agentic AI.",
  },
  {
    keys: ['capy', 'pos', 'shop', 'retail', 'till', 'barcode', 'invoice', 'stock'],
    answer:
      "CapyTech POS is a local-first point-of-sale system delivered for a computer accessories shop. It runs on the shop PC — checkout, variants, inventory, invoices, tax-aware profit reports, USB backup, and phone barcode scanning on the same Wi-Fi. PostgreSQL is the system of record. Checkout uses database prices, row-level stock locks, and idempotent charges so a retry cannot double-sell. Stack: React, TypeScript, Vite, Express, PostgreSQL, Socket.IO. Repo: github.com/Gooniez3/capytech-pos. Not a cloud SaaS — it's a shop-computer product in active use.",
  },
  {
    keys: ['studymate', 'rag', 'langgraph', 'quiz', 'learning', 'llm', 'agent', 'pdf', 'gemini', 'groq'],
    answer:
      "StudyMate AI is his live AI learning platform: studymateai.app. LangGraph routes requests into specialized workflows — direct chat, document RAG, web search, planner, exam revision, interactive quizzes, assignment help, plus a career mode for CVs and LinkedIn. PDFs are chunked with page numbers, extracted with PDF.js (MuPDF fallback), embedded via Cloudflare Workers AI, and stored in PostgreSQL pgvector. Providers: Groq, Gemini, OpenRouter with fallback and real streaming. Auth is Google OAuth plus email. Repo: github.com/Gooniez3/studymate-ai.",
  },
  {
    keys: ['dairy', 'air', 'airline', 'flight', 'booking', 'airport', 'timezone', 'mongo'],
    answer:
      "Dairy Flat Air is a live regional airline booking app: dairy-flat-air-booking.vercel.app. Next.js + TypeScript + MongoDB Atlas. It owns its own timetable (Dairy Flat to Sydney, Rotorua, Great Barrier, Chatham Islands, Lake Tekapo). Search explains why a date fails — no service, sold out, outside horizon — then suggests the next flight. Schedules use IANA timezones so daylight saving doesn't silently shift times. Rolling schedule generation is idempotent. Customers look up bookings with a reference + last name, no account required. Repo: github.com/Gooniez3/dairy-flat-air-booking.",
  },
  {
    keys: ['educat', 'university', 'massey', 'degree', 'bachelor', 'school', 'cs', 'diploma', 'psb', 'gpa', 'grade'],
    answer:
      "Diploma in InfoComm Technology at PSB Academy, awarded January 2025. Then a Bachelor of Information Sciences at Massey University — double major in Computer Science and Information Technology — 8.8 / 9 GPA on the NZ grading system, conferred August 2026. That's the academic base; the portfolio is the proof he turned it into shipped products.",
  },
  {
    keys: ['cert', 'ibm', 'devops', 'agentic', 'professional'],
    answer:
      "Two IBM professional certificates: RAG and Agentic AI, and DevOps and Software Engineering. PDFs are on this site under About — you can download them from the Certificates card.",
  },
  {
    keys: ['github', 'repo', 'code', 'gooniez'],
    answer:
      "GitHub is github.com/Gooniez3. Public repos: capytech-pos, studymate-ai, dairy-flat-air-booking, and his profile README. That's the best place to read how the systems actually work.",
  },
  {
    keys: ['linkedin', 'connect', 'network'],
    answer:
      "LinkedIn: https://www.linkedin.com/in/saw-lwin-htoo-664447415/ — for a full picture of the work, this portfolio and GitHub @Gooniez3 are the source of truth.",
  },
  {
    keys: ['contact', 'email', 'reach', 'message', 'write'],
    answer:
      "Use the contact form on this site, email kokosaw804@gmail.com, GitHub @Gooniez3, or LinkedIn linkedin.com/in/saw-lwin-htoo-664447415/",
  },
  {
    keys: ['experience', 'freelance', 'work', 'client', 'job history'],
    answer:
      "He's currently shipping as a freelance full-stack developer. The standout client system is CapyTech POS, in daily use at a computer accessories shop. Alongside that he built and deployed StudyMate AI and Dairy Flat Air. Path: PSB diploma → Massey BInfSc at 8.8/9 → client and live products. He's looking at full-time software engineering roles as well as freelance product work.",
  },
]

export const prompts = [
  "Who is Saw?",
  'Tell me about CapyTech POS.',
  'What is StudyMate AI?',
  'Why hire him?',
]

export function answerFinn(question: string) {
  const q = question.toLowerCase()
  let best: { score: number; answer: string } | null = null
  for (const item of knowledge) {
    const score = item.keys.reduce((n, key) => n + (q.includes(key) ? 1 : 0), 0)
    if (score > 0 && (!best || score > best.score)) best = { score, answer: item.answer }
  }
  if (best) return best.answer
  return "I can brief you on Saw (Finn): skills, CapyTech POS, StudyMate AI, Dairy Flat Air, Massey education, IBM certs, GitHub, LinkedIn, or whether he's a fit for a role. What do you want to know?"
}
