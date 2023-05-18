"use client";

import { State } from "@/orchestrator/model";
import { createContext, useContext, useState } from "react";
import { CREATED_TICKETS_STATE } from "./sample";

type StateContext = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const stateContext = createContext<StateContext | undefined>(undefined);

type StateProviderProps = {
  children: React.ReactNode;
};

export function StateProvider({ children }: StateProviderProps) {
  const [state, setState] = useState<State>(CREATED_TICKETS_STATE);

  return (
    <stateContext.Provider value={{ state, setState }}>
      {children}
    </stateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(stateContext);
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
}
