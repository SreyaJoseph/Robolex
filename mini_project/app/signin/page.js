"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Signing in with:", email, password);
    router.push("/welcome"); // Redirect to WelcomePage first
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Sign In to Robolex</h2>

        <div className="mb-4 text-left">
          <label className="text-gray-300 text-sm block mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 text-left">
          <label className="text-gray-300 text-sm block mb-2">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center text-gray-300 text-sm mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <button className="text-blue-400 hover:underline">Forgot Password?</button>
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Sign In
        </button>

        <p className="text-gray-400 text-sm mt-4">
          New to Robolex?{" "}
          <button onClick={() => router.push("/register")} className="text-green-400 hover:underline">
            Get Started
          </button>
        </p>
      </div>
    </div>
  );
}
