import { Routes, Route } from "react-router-dom";
import AlphabetGrid from "./components/AlphabetGrid";
import LetterPage from "./components/LetterPage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AlphabetGrid />} />
      <Route path="/alphabetgrid" element={<AlphabetGrid />} />
      <Route path="/letter/:letter" element={<LetterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
