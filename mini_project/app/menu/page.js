"use client";
import { useRouter } from "next/navigation";

const Menu = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Menu Page</h1>
      <button onClick={() => router.push("/")}>Go Home</button>
    </div>
  );
};

export default Menu;
