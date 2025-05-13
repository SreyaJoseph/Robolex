import { Suspense } from "react";
import letsstartClientPage from "./letsstartClientPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <letsstartClientPage />
    </Suspense>
  );
}
