import React from 'react';
import ReadingAssistant from './ReadingAssistant';

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📖 Read Aloud Assistant</h1>
      <ReadingAssistant />
    </main>
  );
}
