"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation function
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
      } else {
        // After successful login, the httpOnly cookie is set
        router.push("/welcome"); // Redirect to welcome/dashboard page
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Sign In to Robolex</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignIn}>
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          New to Robolex?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-green-400 hover:underline"
          >
            Get Started
          </button>
        </p>
      </div>
    </div>
  );
}
