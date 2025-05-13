"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "./globals.css"; // Import global styles

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login"); // Redirect to login page
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <motion.h1
        className="text-6xl font-bold text-white text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
      >
        Robolex
      </motion.h1>
    </div>
  );
}
