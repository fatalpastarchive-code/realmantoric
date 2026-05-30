"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface DeepWorkContextType {
  isActive: boolean;
  toggleDeepWork: () => void;
}

const DeepWorkContext = createContext<DeepWorkContextType | undefined>(undefined);

export function DeepWorkProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  const toggleDeepWork = () => {
    setIsActive((prev) => !prev);
  };

  // Sync with body class for global CSS styles
  useEffect(() => {
    if (isActive) {
      document.body.classList.add("deep-work-active");
    } else {
      document.body.classList.remove("deep-work-active");
    }
  }, [isActive]);

  return (
    <DeepWorkContext.Provider value={{ isActive, toggleDeepWork }}>
      {children}
    </DeepWorkContext.Provider>
  );
}

export function useDeepWork() {
  const context = useContext(DeepWorkContext);
  if (context === undefined) {
    throw new Error("useDeepWork must be used within a DeepWorkProvider");
  }
  return context;
}
