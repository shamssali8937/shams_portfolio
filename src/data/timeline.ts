// Mission Control — Timeline Data (Sourced from CV)
export interface TimelineEvent {
  id: string;
  type: "education" | "work" | "freelance" | "certification" | "achievement";
  title: string;
  organization: string;
  location?: string;
  period: string;
  year: number;
  description: string;
  highlights?: string[];
  iconName: "GraduationCap" | "Code" | "Briefcase" | "Rocket" | "Trophy" | "Award";
}

export const timeline: TimelineEvent[] = [
  {
    id: "bsit-sargodha",
    type: "education",
    title: "Bachelor of Science in Information Technology",
    organization: "University of Sargodha",
    location: "Sargodha, Pakistan",
    period: "2022 – 2026",
    year: 2022,
    description:
      "Graduating with a CGPA of 3.52 / 4.00. Specialized in web engineering, database systems, network administration, and full-stack web development.",
    highlights: [
      "CGPA: 3.52 / 4.00",
      "Web Engineering & Systems",
      "Database Systems & Prisma ORM",
      "Computer Networks & IT Admin",
    ],
    iconName: "GraduationCap",
  },
  {
    id: "careerbridge-dev",
    type: "work",
    title: "Lead Full-Stack Developer",
    organization: "CareerBridge Job Portal",
    location: "Sargodha, Pakistan",
    period: "2026",
    year: 2026,
    description:
      "Engineered a complete recruitment platform for job seekers and recruiters with Google OAuth, JWT authorization, role-based access control, and Cloudinary media management.",
    highlights: [
      "Google OAuth & JWT Auth",
      "Role-Based Dashboards (Admin/Recruiter/Candidate)",
      "Cloudinary Resume & Media Integration",
      "Redux Toolkit State Management",
    ],
    iconName: "Code",
  },
  {
    id: "whitedavid23-internship",
    type: "work",
    title: "AI-Powered Full Stack Web Developer Intern",
    organization: "WhiteDavid23 Academy",
    location: "Remote (3-Month Internship)",
    period: "April 2026 – July 2026",
    year: 2026,
    description:
      "Worked on full-stack web development spanning frontend and backend. Built PGNexus (multi-role accommodation platform) as final capstone project using Next.js, TypeScript, PostgreSQL, Prisma ORM, and Cloudinary. ISO 9001:2015 certified.",
    highlights: [
      "Built PGNexus Capstone Project",
      "ISO 9001:2015 Certified Internship",
      "Leveraged AI coding & dev tools",
      "Admin, Owner & Tenant Modules",
    ],
    iconName: "Briefcase",
  },
  {
    id: "dewan-traders-freelance",
    type: "freelance",
    title: "Freelance Web Developer",
    organization: "Dewan Traders (www.dewantrade.com)",
    location: "Remote",
    period: "June 2026 – July 2026",
    year: 2026,
    description:
      "Designed and developed a full-stack import/export e-commerce platform featuring product catalog, order management, payment verification workflow, multi-currency support (PKR/USD), and Resend email notifications.",
    highlights: [
      "Live Production Site: www.dewantrade.com",
      "PostgreSQL (Supabase) + Express.js Backend",
      "PKR/USD Multi-Currency Support",
      "Resend Email Notifications & JWT",
    ],
    iconName: "Rocket",
  },
  {
    id: "leadership-sports",
    type: "achievement",
    title: "Open Source Contributor & Competitive Athlete",
    organization: "Developer Communities & Sports",
    location: "Sargodha, Pakistan",
    period: "Ongoing",
    year: 2026,
    description:
      "Active contributor to open-source software projects and developer communities. Competitive basketball player demonstrating teamwork, discipline, resilience, and leadership skills.",
    highlights: [
      "Open-source contributions",
      "Competitive Basketball Athlete",
      "Teamwork & Leadership",
    ],
    iconName: "Trophy",
  },
];
