"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Simulated database
  const registeredUsers = [
    { email: "user@example.com", password: "Test@123" },
    { email: "admin@robolex.com", password: "Admin@456" },
  ];

  const handleResetPassword = () => {
    setMessage("");

    const user = registeredUsers.find((user) => user.email === email);
    if (!user) {
      setMessage("Email not found. Please check your email.");
      return;
    }

    if (!newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setMessage("Password must be at least 8 characters long, include letters, numbers, and special characters.");
      return;
    }

    // Simulated DB update (Replace with API call)
    user.password = newPassword;
    setMessage("Password successfully updated! Redirecting to login...");
    
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Reset Password</h2>

        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}

        <input
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white mb-4"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
