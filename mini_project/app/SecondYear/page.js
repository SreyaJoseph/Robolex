"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Edit, Bed, Settings, Square } from "lucide-react";

const SecondYear = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(to bottom, #111827, #1f2937)",
      color: "white",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px",
      backgroundColor: "#111827",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    link: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "20px",
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
    },
    settingsIcon: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    welcomeSection: {
      textAlign: "center",
      padding: "40px 0",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#60a5fa",
    },
    subtitle: {
      marginTop: "10px",
      fontSize: "18px",
      color: "#d1d5db",
    },
    featuresSection: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "24px",
      padding: "0 32px",
    },
    footer: {
      marginTop: "auto",
      padding: "16px",
      backgroundColor: "#111827",
      textAlign: "center",
      fontSize: "14px",
      color: "#9ca3af",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <Link href="/main-menu" style={styles.link}>
          <ArrowLeft style={{ width: "24px", height: "24px" }} /> HOME
        </Link>
        
      </header>

      <section style={styles.welcomeSection}>
        <h1 style={styles.title}>Learning made easier!</h1>
        <p style={styles.subtitle}>Choose what your kid wants to learn</p>
      </section>

      <section style={styles.featuresSection}>
        <FeatureCard icon={<BookOpen size={40} />} title="Spell It" link="/TextRecognition" />
        <FeatureCard icon={<Edit size={40} />} title="Sentence Framing" link="/SentenceFraming" />
        <FeatureCard icon={<Bed size={40} />} title="Bed Time Stories" link="/BedtimeStories" />  
        <FeatureCard icon={<Square size={40} />} title="Memory Matrix" link="/MemoryMatrix" />
      </section>

      <footer style={styles.footer}>
        <p>&copy; 2025 Robolex. Making learning easier for kids.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, link }) => {
  const styles = {
    card: {
      padding: "24px",
      backgroundColor: "#374151",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "16px",
      textDecoration: "none",
      transition: "background 0.3s",
      cursor: "pointer",
    },
    icon: {
      color: "#60a5fa",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      color: "white",
    },
  };

  return (
    <Link href={link} passHref>
      <div
        style={styles.card}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4b5563")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#374151")}
      >
        <div style={styles.icon}>{icon}</div>
        <h3 style={styles.title}>{title}</h3>
      </div>
    </Link>
  );
};

export default SecondYear;
