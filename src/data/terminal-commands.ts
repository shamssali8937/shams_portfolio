// Mission Control — Terminal Commands (Sourced from CV)
export interface TerminalResponse {
  type: "text" | "list" | "table" | "link" | "ascii";
  content: string | string[] | { label: string; value: string }[];
}

export const terminalCommands: Record<string, TerminalResponse[]> = {
  help: [
    {
      type: "ascii",
      content: `
  ╔═══════════════════════════════════════╗
  ║     MISSION CONTROL TERMINAL v1.0     ║
  ╚═══════════════════════════════════════╝`,
    },
    {
      type: "text",
      content: "Available commands:",
    },
    {
      type: "list",
      content: [
        "about      → Who is Shams Ali Mehdi?",
        "projects   → View all projects (CareerBridge, PGNexus, Dewan Traders)",
        "skills     → Technical skills (Frontend, Backend, DB, IT, Net)",
        "resume     → View & download CV",
        "contact    → Get in touch (Email, Phone, LinkedIn, GitHub)",
        "status     → Current mission status",
        "clear      → Clear the terminal",
        "exit       → Close terminal",
      ],
    },
  ],

  about: [
    {
      type: "ascii",
      content: `
  ╔═══════════════════════════════╗
  ║  LOADING PILOT PROFILE...     ║
  ╚═══════════════════════════════╝`,
    },
    {
      type: "text",
      content: "► SHAMS ALI MEHDI — Full-Stack Developer & IT Specialist",
    },
    {
      type: "text",
      content:
        "Information Technology graduate from University of Sargodha (CGPA 3.52/4.00) with hands-on experience in full-stack web platforms, IT support, networking, and AI-assisted development.",
    },
    {
      type: "list",
      content: [
        "📍 Location    → Sargodha, Pakistan",
        "🎓 Education   → BS Information Technology (2022–2026) | CGPA 3.52",
        "💼 Experience  → WhiteDavid23 Academy Intern | Freelance Developer",
        "⚡ Focus       → Next.js, Node.js, PostgreSQL, IT Support, Networking",
        "🏆 Certified   → ISO 9001:2015 Internship Certificate",
      ],
    },
  ],

  projects: [
    {
      type: "text",
      content: "► MISSION LOG — Completed & Active Projects",
    },
    {
      type: "table",
      content: [
        { label: "CareerBridge", value: "Recruitment portal with Google OAuth & JWT [LIVE]" },
        { label: "PGNexus", value: "Accommodation management platform — Capstone [LIVE]" },
        { label: "Dewan Traders", value: "Import/Export e-commerce site at www.dewantrade.com [LIVE]" },
        // { label: "Future Labs", value: "AI coding workflows & C#/.NET R&D [ACTIVE]" },
      ],
    },
    {
      type: "text",
      content: "→ Click any planet in Mission Control to explore project details.",
    },
  ],

  skills: [
    {
      type: "text",
      content: "► SYSTEMS CHECK — Technical Capabilities",
    },
    {
      type: "table",
      content: [
        { label: "Frontend", value: "Next.js · React.js · TypeScript · Redux Toolkit · Tailwind CSS" },
        { label: "Backend", value: "Node.js · Express.js · ASP.NET Core · C# · REST APIs · JWT" },
        { label: "Database", value: "PostgreSQL · MongoDB · Prisma ORM · SQL Server · Supabase" },
        { label: "AI & Tools", value: "AI Coding Tools · Git/GitHub · Postman · Cloudinary" },
        { label: "IT Support", value: "Windows Admin · Linux Admin · Active Directory · Troubleshooting" },
        { label: "Networking", value: "TCP/IP · DNS/DHCP · VPN · Firewalls · Diagnostics" },
      ],
    },
  ],

  resume: [
    {
      type: "text",
      content: "► PILOT CREDENTIALS & EDUCATION",
    },
    {
      type: "list",
      content: [
        "🎓 BS Information Technology — University of Sargodha (CGPA 3.52 / 4.00)",
        "💼 AI Web Developer Intern — WhiteDavid23 Academy (April–July 2026)",
        "🚀 Freelance Developer — Dewan Traders (June–July 2026)",
        "📜 ISO 9001:2015 Certified Internship Completion",
      ],
    },
    {
      type: "link",
      content: "→ Download full CV: /resume.pdf",
    },
  ],

  contact: [
    {
      type: "text",
      content: "► ESTABLISH COMMUNICATION",
    },
    {
      type: "table",
      content: [
        { label: "Email", value: "aliveshams@gmail.com" },
        { label: "Phone", value: "0347-5084514" },
        { label: "GitHub", value: "github.com/shamssali8937" },
        { label: "LinkedIn", value: "linkedin.com/in/shams-ali-mehdi-8531103a8" },
        { label: "Location", value: "Sargodha, Pakistan (Remote Friendly)" },
        { label: "Status", value: "✅ Available for full-time & freelance opportunities" },
      ],
    },
  ],

  status: [
    {
      type: "ascii",
      content: `
  ┌─────────────────────────────────┐
  │  MISSION STATUS: ALL SYSTEMS GO │
  └─────────────────────────────────┘`,
    },
    {
      type: "table",
      content: [
        { label: "Availability", value: "✅ Open to opportunities" },
        { label: "Current Focus", value: "Full-Stack, IT & AI-Assisted Dev" },
        { label: "CGPA Score", value: "3.52 / 4.00" },
        { label: "Energy Level", value: "██████████ 100%" },
      ],
    },
  ],
};
