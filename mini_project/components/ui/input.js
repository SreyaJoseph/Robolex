'use client';

export function Input({ type, accept, onChange }) {
  return (
    <input
      type={type}
      accept={accept}
      onChange={onChange}
      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
