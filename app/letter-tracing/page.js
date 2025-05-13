// app/PopTheBubble/animal/page.js or .tsx
import React, { Suspense } from 'react';
import lettertracingClientPage from './lettertracingClientPage'; // move logic here

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <lettertracingClientPage />
    </Suspense>
  );
}

