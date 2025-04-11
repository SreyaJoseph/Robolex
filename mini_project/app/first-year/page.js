"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Edit, Gamepad2, Ruler } from "lucide-react";
import { useRouter } from "next/navigation";

const FirstYear = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900 shadow-md">
        <Link href="/age-selection" className="flex items-center gap-2 text-lg font-bold text-white">
          <ArrowLeft size={24} /> Home
        </Link>
      </header>

      {/* Title Section */}
      <section className="text-center py-10">
        <h1 className="text-3xl font-bold text-blue-400">Welcome to First Year Learning</h1>
        <p className="text-lg text-gray-300 mt-2">Choose a learning category</p>
      </section>

      {/* Cards Section */}
      <section className="flex flex-col items-center gap-8 px-4">
        {/* First Row */}
        <div className="flex gap-4">
          <FeatureCard icon={<Ruler size={45} />} title="Lines" link="/Lines" />
          <FeatureCard icon={<BookOpen size={45} />} title="Alphabets" link="/alphabetgrid" />
        </div>

        {/* Second Row */}
        <div className="flex gap-4">
          <FeatureCard icon={<Edit size={45} />} title="Words" link="/Words" />
          <FeatureCard icon={<Gamepad2 size={45} />} title="Assessments" link="/WordAssessment" />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto p-4 bg-gray-900 text-center text-sm text-gray-400">
        &copy; 2025 Robolex. Making learning easier for kids.
      </footer>
    </div>
  );
};

// Updated Card Design with larger font size and slightly increased width
const FeatureCard = ({ icon, title, link }) => (
  <Link
    href={link}
    className="p-5 bg-gray-700 rounded-lg flex flex-col items-center gap-3 text-white transition hover:bg-gray-600 w-40 text-center"
  >
    <div className="text-blue-400">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
  </Link>
);

export default FirstYear;
