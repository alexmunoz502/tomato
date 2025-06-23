import { useRef, createContext, useContext } from "react";

type AppContainerContextType = {
  containerRef: React.RefObject<HTMLElement | null>;
};

export const AppContainerContext = createContext<
  AppContainerContextType | undefined
>(undefined);

export const useAppContainer = (): AppContainerContextType => {
  const context = useContext(AppContainerContext);
  if (!context) {
    throw new Error(
      "useAppContainer must be used within a AppContainer Provider"
    );
  }
  return context;
};
