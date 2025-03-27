"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const AlphabetGrid = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white text-center p-6 relative">
      {/* 🔙 Back Button */}
      <Link href="/first-year" className="absolute top-6 left-6 flex items-center gap-2 text-lg text-blue-400">
        <ArrowLeft size={24} /> Home
      </Link>

      <h1 className="text-3xl font-bold text-blue-400 mb-6">Choose an Alphabet</h1>

      <div className="grid grid-cols-6 gap-4 max-w-md">
        {alphabets.map((letter) => (
          <Link key={letter} href={`/letter/${letter}`} className="w-14 h-14 flex items-center justify-center text-2xl font-bold text-white bg-blue-500 rounded-lg transition hover:bg-blue-400">
            {letter}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlphabetGrid;
