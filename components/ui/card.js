'use client';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white shadow-lg p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
}
