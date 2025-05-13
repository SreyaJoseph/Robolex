"use client"; 
import { createContext, useContext, useState } from "react";

const StoryContext = createContext(null);

export const StoryProvider = ({ children }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  
  return (
    <StoryContext.Provider value={{ selectedStory, setSelectedStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
