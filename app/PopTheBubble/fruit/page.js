// app/PopTheBubble/fruit/page.js or .tsx
import React, { Suspense } from 'react';
import FruitClientPage from './FruitClientPage'; // move logic here

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FruitClientPage />
    </Suspense>
  );
}
