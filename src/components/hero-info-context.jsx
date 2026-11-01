"use client";

import { createContext, useContext } from "react";

const HeroInfoContext = createContext(null);

export function HeroInfoProvider({ children, value }) {
  return (
    <HeroInfoContext.Provider value={value}>
      {children}
    </HeroInfoContext.Provider>
  );
}

export function useHeroInfo() {
  const heroInfo = useContext(HeroInfoContext);

  if (!heroInfo) {
    throw new Error("useHeroInfo must be used within a HeroInfoProvider");
  }

  return heroInfo;
}
