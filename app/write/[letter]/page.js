"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VideoPage() {
  const { letter } = useParams(); // The letter from the URL (e.g., /letter/A)
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
      {/* Back button */}
      <button
        className="absolute top-4 left-4 bg-blue-500 px-4 py-2 rounded text-white"
        onClick={() => router.push("/alphabetgrid")}
      >
        🔙 Back
      </button>
      
      <h1 className="text-3xl font-bold mb-6">
        Watch Video for Letter {letter.toUpperCase()}
      </h1>
      
      <div className="mb-6 w-full max-w-md">
        <video 
          controls 
          className="w-full rounded shadow-lg" 
          src={`/videos/Write${letter.toUpperCase()}.mp4`}
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
      <button
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold transition"
        // Note the query parameter ?letter=${letter}
        onClick={() => router.push(`/letter-tracing?letter=${letter}`)}
      >
        Skip Video & Start Tracing
      </button>
    </div>
  );
}
