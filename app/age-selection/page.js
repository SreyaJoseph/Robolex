"use client";
import { useRouter } from "next/navigation";

export default function AgeSelectionPage() {
  const router = useRouter();

  const handleSelection = (ageGroup) => {
    router.push(`/lets-start?age=${ageGroup}`);
  };

  const handleBack = () => {
    router.push("/main-menu"); // Adjust the route if your main menu has a different path
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
      >
        ← Back
      </button>

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
