// app/PopTheBubble/animal/page.js or .tsx
import React, { Suspense } from 'react';
import AnimalClientPage from './AnimalClientPage'; // move logic here

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimalClientPage />
    </Suspense>
  );
}

