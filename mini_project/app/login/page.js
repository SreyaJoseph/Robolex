"use client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Already have an account?</h2>
        <button
          onClick={() => router.push("/signin")}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        <hr className="my-6 border-gray-700 w-3/4 mx-auto" />

        <h2 className="text-2xl font-bold text-white mb-4">New to Robolex?</h2>
        <button
          onClick={() => router.push("/register")}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
