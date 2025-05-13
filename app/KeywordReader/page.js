import { Suspense } from "react";
import KeywordReader from "./KeywordReader";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KeywordReader />
    </Suspense>
  );
}
