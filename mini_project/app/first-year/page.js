"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Edit, Gamepad2, Ruler, PenTool } from "lucide-react";
import { useRouter } from "next/navigation"; // Import Next.js router

const FirstYear = () => {
  const router = useRouter(); // Initialize router for navigation

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="flex items-center justify-between p-4 bg-gray-900 shadow-md">
        <Link href="/age-selection" className="flex items-center gap-2 text-lg font-bold text-white">
          <ArrowLeft size={24} /> Home
        </Link>
      </header>

      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-blue-400">Welcome to First Year Learning</h1>
        <p className="text-lg text-gray-300 mt-2">Choose a learning category</p>
      </section>

      <section className="flex flex-col items-center gap-6 px-8">
        {/* First Row */}
        <div className="flex gap-6">
          <FeatureCard icon={<Ruler size={40} />} title="Lines" link="/Lines" />
          <FeatureCard icon={<BookOpen size={40} />} title="Alphabets" link="/alphabetgrid" />
        </div>

        {/* Second Row */}
        <div className="flex gap-6">
          <FeatureCard icon={<Edit size={40} />} title="Words" link="/Words" />
          <FeatureCard icon={<PenTool size={40} />} title="Letter Tracing" link="/letter-tracing" />
        </div>

        {/* Third Row - Centered */}
        <div className="flex justify-center w-full">
          <FeatureCard icon={<Gamepad2 size={40} />} title="Assessments" link="/WordAssessment" />
        </div>
      </section>

      <footer className="mt-auto p-4 bg-gray-900 text-center text-sm text-gray-400">
        &copy; 2025 Robolex. Making learning easier for kids.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, link }) => (
  <Link href={link} className="p-6 bg-gray-700 rounded-lg flex flex-col items-center gap-4 text-white transition hover:bg-gray-600 w-48 text-center">
    <div className="text-blue-400">{icon}</div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </Link>
);

export default FirstYear;
