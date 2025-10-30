"use client";

import { StateFn } from "@shared/types/abbreviations";
import { createContext, PropsWithChildren, useContext, useState } from "react";

export type HeaderState = "black" | "white" | "hidden";

interface UIContextProps {
  headerState: HeaderState;
  setHeaderState: StateFn<HeaderState>;
}

const initialData: UIContextProps = {
  headerState: "white",
  setHeaderState: () => {},
};

const UiContext = createContext(initialData);

function UIProvider({ children }: PropsWithChildren) {
  const [headerState, setHeaderState] = useState(initialData.headerState);

  return (
    <UiContext.Provider value={{ headerState, setHeaderState }}>
      {children}
    </UiContext.Provider>
  );
}

function useUIContext() {
  return useContext(UiContext);
}

export { UIProvider, useUIContext };
