"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LetterTracingIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/letter-tracing/A");
  }, [router]);

  return null;
}
