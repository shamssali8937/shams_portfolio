// Mission Control — Projects Data (Sourced from CV)
export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  stack: string[];
  role: string;
  year: string;
  status: "Live" | "In Development" | "Archived" | "Concept";
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  planet: {
    color: string;
    emissive: string;
    size: number;
    orbitRadius: number;
    orbitSpeed: number;
    rotationSpeed: number;
  };
  highlights: string[];
}

export const projects: Project[] = [
  {
    id: "careerbrige",
    name: "CareerBridge",
    tagline: "Job Portal & Recruitment Platform",
    description: "Full recruitment platform connecting job seekers with recruiters.",
    longDescription:
      "Developed a complete recruitment platform for job seekers and recruiters featuring Google OAuth authentication, secure JWT authorization, role-based dashboards (Admin, Recruiter, Candidate), cloud-based media management, and responsive user experience.",
    stack: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "JWT",
      "Cloudinary",
    ],
    role: "Full-Stack Developer",
    year: "2026",
    status: "Live",
    links: {
      github: "https://github.com/shamssali8937/careerbidge",
      live: "https://career-brigde-next.vercel.app/"
    },
    planet: {
      color: "#4A9B8E",
      emissive: "#1A5C54",
      size: 0.65,
      orbitRadius: 4.5,
      orbitSpeed: 0.18,
      rotationSpeed: 0.6,
    },
    highlights: [
      "Implemented Google OAuth & secure JWT authorization",
      "Built recruiter and candidate dashboards with RBAC",
      "Integrated Cloudinary for media and resume handling",
      "Delivered a responsive user-friendly interface",
    ],
  },
  {
    id: "pgnexus",
    name: "PGNexus",
    tagline: "PG Room & Accommodation Management System",
    description: "Multi-role accommodation platform (Admin, Owner, Tenant).",
    longDescription:
      "Built as the final capstone project during the 3-month internship at WhiteDavid23 Academy. Supports Admin, Owner, and Tenant modules with secure authentication, role-based authorization, room listings, and booking management using Next.js, TypeScript, PostgreSQL, and Prisma ORM.",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Tailwind CSS",
      "Cloudinary",
      "REST APIs",
    ],
    role: "AI-Powered Full Stack Web Developer Intern",
    year: "2026",
    status: "Live",
    links: {
      github: "https://github.com/shamssali8937/pgnexus",
      live: "https://pg-room-platform.vercel.app/",
    },
    planet: {
      color: "#C4956A",
      emissive: "#7A5030",
      size: 0.5,
      orbitRadius: 6.5,
      orbitSpeed: 0.12,
      rotationSpeed: 0.4,
    },
    highlights: [
      "Multi-role platform: Admin, Owner, and Tenant modules",
      "Room listing and booking management workflows",
      "Leveraged AI coding tools to accelerate feature delivery",
      "Received ISO 9001:2015 certified internship completion",
    ],
  },
  {
    id: "dewan-traders",
    name: "Dewan Traders",
    tagline: "Import & Export E-Commerce Platform",
    description: "Full-stack import/export e-commerce platform.",
    longDescription:
      "Designed and developed a production e-commerce platform for Dewan Traders. Features role-based dashboards, product catalog, order management, payment verification workflow, multi-currency support (PKR/USD), and email notification system using Next.js, Node.js, PostgreSQL (Supabase), JWT, and Resend.",
    stack: [
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "Resend",
      "JWT",
    ],
    role: "Freelance Web Developer",
    year: "2026",
    status: "Live",
    links: {
      live: "https://www.dewantrade.com",
    },
    planet: {
      color: "#D97757",
      emissive: "#8C3E1F",
      size: 0.45,
      orbitRadius: 8.2,
      orbitSpeed: 0.09,
      rotationSpeed: 0.35,
    },
    highlights: [
      "Payment verification & order management workflows",
      "Multi-currency support (PKR/USD) with fast animations",
      "Email notification integration using Resend & JWT",
      "Live production site at www.dewantrade.com",
    ],
  },
  // {
  //   id: "future-labs",
  //   name: "Future Labs",
  //   tagline: "AI-Assisted Development & R&D",
  //   description: "AI-assisted tools, C#/.NET prototypes, and experiments.",
  //   longDescription:
  //     "Personal research and development space showcasing AI-assisted development tools, ASP.NET Core microservices, C# desktop prototypes, and automated code quality workflows tested during internship and personal projects.",
  //   stack: [
  //     "C#",
  //     "ASP.NET Core",
  //     "Python",
  //     "OpenAI API",
  //     "SQL Server",
  //     "Git",
  //   ],
  //   role: "Developer & Researcher",
  //   year: "2026",
  //   status: "In Development",
  //   links: {
  //     github: "https://github.com/shamssali8937",
  //   },
  //   planet: {
  //     color: "#7C6FAE",
  //     emissive: "#3D3566",
  //     size: 0.4,
  //     orbitRadius: 10.0,
  //     orbitSpeed: 0.07,
  //     rotationSpeed: 0.25,
  //   },
  //   highlights: [
  //     "AI-assisted coding and development workflows",
  //     "ASP.NET Core & C# backend services",
  //     "Database design with SQL Server & PostgreSQL",
  //     "Automated code review & task tracking",
  //   ],
  // },
];
