import type { Metadata } from "next";
import RecruiterView from "@/components/mission/RecruiterMode/RecruiterView";

export const metadata: Metadata = {
  title: "Shams Sali — Recruiter Portfolio & CV",
  description:
    "Full-Stack Developer, IT, Cloud & AI Specialist. Clean, traditional CV view featuring technical skills, enterprise projects, work experience, and contact details.",
};

export default function RecruiterPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#1E293B]">
      <RecruiterView />
    </main>
  );
}
