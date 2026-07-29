// Mission Control — Skills Data (Sourced from CV)
export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    color: "#4A9B8E",
    glowColor: "rgba(74,155,142,0.4)",
    icon: "✦",
    skills: [
      { name: "Next.js", level: 92 },
      { name: "React.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "Redux Toolkit", level: 82 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    color: "#5E7C7B",
    glowColor: "rgba(94,124,123,0.4)",
    icon: "◈",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      // { name: "ASP.NET Core", level: 75 },
      // { name: "C#", level: 78 },
      { name: "REST APIs", level: 92 },
      { name: "JWT Authorization", level: 90 },
    ],
  },
  {
    id: "database",
    name: "Database",
    color: "#C4956A",
    glowColor: "rgba(196,149,106,0.4)",
    icon: "◉",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "Prisma ORM", level: 88 },
      { name: "SQL Server", level: 80 },
      { name: "Supabase", level: 82 },
    ],
  },
  {
    id: "ai",
    name: "AI & Tools",
    color: "#D97757",
    glowColor: "rgba(217,119,87,0.4)",
    icon: "✧",
    skills: [
      { name: "AI Coding Tools", level: 90 },
      { name: "OpenAI API", level: 82 },
      { name: "Git & GitHub", level: 92 },
      { name: "Postman", level: 88 },
      { name: "VS Code", level: 95 },
    ],
  },
  {
    id: "it-support",
    name: "IT Support",
    color: "#E6B17E",
    glowColor: "rgba(230,177,126,0.4)",
    icon: "⊕",
    skills: [
      { name: "Windows Admin", level: 88 },
      { name: "Linux Administration", level: 78 },
      { name: "Active Directory", level: 75 },
      { name: "Troubleshooting", level: 92 },
      { name: "Hardware & Support", level: 85 },
    ],
  },
  {
    id: "networking",
    name: "Networking",
    color: "#254441",
    glowColor: "rgba(37,68,65,0.6)",
    icon: "⊗",
    skills: [
      { name: "TCP/IP", level: 80 },
      { name: "DNS / DHCP", level: 78 },
      { name: "VPN Configuration", level: 72 },
      { name: "Firewalls & Security", level: 70 },
      { name: "Network Diagnostics", level: 75 },
    ],
  },
];
