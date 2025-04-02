"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Placeholder for registration logic
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Registering with:", name, email, password);
    router.push("/login"); // Redirect to dashboard after registration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Create Your Account</h2>

        <div className="mb-4 text-left">
          <label className="text-gray-300 text-sm block mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className="mb-4 text-left">
          <label className="text-gray-300 text-sm block mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <button onClick={() => router.push("/signin")} className="text-green-400 hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
