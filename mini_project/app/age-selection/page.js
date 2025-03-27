"use client";
import { useRouter } from "next/navigation";

export default function AgeSelectionPage() {
  const router = useRouter();

  const handleSelection = (ageGroup) => {
    // Navigate to the Let's Start page with the selected age group as a query parameter.
    router.push(`/lets-start?age=${ageGroup}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-10">What is your age group?</h1>
      <div className="flex flex-col space-y-6 w-full max-w-md">
        <button
          onClick={() => handleSelection("3-4")}
          className="bg-blue-500 w-full py-4 rounded-lg text-white text-lg font-semibold hover:bg-blue-600 transition"
        >
          3 & 4
        </button>
        <button
          onClick={() => handleSelection("5-7")}
          className="bg-blue-500 w-full py-4 rounded-lg text-white text-lg font-semibold hover:bg-blue-600 transition"
        >
          5 - 7
        </button>
      </div>
    </div>
  );
}
