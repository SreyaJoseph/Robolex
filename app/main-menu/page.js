"use client";
import { useRouter } from "next/navigation";

export default function MainMenu() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Welcome! <br /> Choose an option
      </h1>
      <div className="flex flex-col space-y-6 w-full max-w-md">
        <button
          onClick={() => router.push("/chatbot")}
          className="bg-blue-500 w-full py-4 rounded-lg text-white text-lg font-semibold hover:bg-blue-600 transition"
        >
          Chatbot
        </button>
        <button
          onClick={() => router.push("/age-selection")}
          className="bg-orange-500 w-full py-4 rounded-lg text-white text-lg font-semibold hover:bg-orange-600 transition"
        >
          Activity Area
        </button>
      </div>
    </div>
  );
}
