"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Dialogue Box */}
      <div className="relative">
        <Image
          src="/dia_box.png" // Path to the transparent PNG in the public folder
          alt="Dialogue Box"
          width={300}
          height={150}
          className="absolute top-[-180px] left-[120px]"
        />
        
        {/* Tortoise Mascot */}
        <Image src="/tortoise.png" alt="Robolex Mascot" width={300} height={300} />
        
        {/* Dialogue Text inside the box */}
        <div className="absolute top-[-70px] left-[230px] text-center text-white font-semibold text-lg">
          <p>Hi, I'm Robolex!</p>
        </div>
      </div>

      {/* Continue Button - Redirects to Main Menu */}
      <button
        onClick={() => router.push("/main-menu")}
        className="mt-6 bg-blue-500 px-6 py-3 rounded-lg text-white hover:bg-blue-600 transition"
      >
        Continue
      </button>
    </div>
  );
}
