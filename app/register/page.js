"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate email format
  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Validate password strength
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Create Your Account</h2>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleRegister}>
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
            <p className="text-gray-400 text-xs mt-1">
              Must include uppercase, lowercase, number, and special character.
            </p>
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
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-green-400 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
