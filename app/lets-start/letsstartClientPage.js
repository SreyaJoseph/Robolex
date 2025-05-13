"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LetsStartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const age = searchParams.get("age") || "";

  useEffect(() => {
    if (age === "3-4") {
      // Automatically redirect to the first-year page after a delay
      setTimeout(() => {
        router.push("/first-year");
      }, 2000); // 2-second delay for better user experience
    }
  }, [age, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6">You're all set!</h1>
      <p className="text-lg mb-10">Let's begin your journey.</p>
      <button
        onClick={() => router.push("/SecondYear")}
        className="bg-indigo-500 px-8 py-4 rounded-lg text-white text-lg font-semibold hover:bg-indigo-600 transition"
      >
        Let's Start
      </button>
    </div>
  );
}
