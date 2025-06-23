"use client";
import { AppContainerContext } from "@/contexts/AppContainerContext";

import { useRef } from "react";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <AppContainerContext.Provider value={{ containerRef }}>
      <div
        ref={containerRef}
        className={`
          relative max-w-content mx-auto 
          overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth
          max-h-dvh
        `}
      >
        {children}
      </div>
    </AppContainerContext.Provider>
  );
};

export default AppContainer;
