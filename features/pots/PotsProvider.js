"use client";

import { useState, createContext, use } from "react";

const PotsContext = createContext();

function PotsProvider({ pots, children }) {
  const [dialog, setDialog] = useState({ type: null, pot: null });

  const closeDialog = () => setDialog({ type: null, pot: null });
  const openDialog = (type, data = null) => setDialog({ type, data });

  return (
    <PotsContext.Provider value={{ dialog, openDialog, closeDialog, pots }}>
      {children}
    </PotsContext.Provider>
  );
}

function usePots() {
  const context = use(PotsContext);
  if (context === undefined)
    throw new Error("usePots was used outside PotsContext.");
  return context;
}

export { PotsProvider, usePots };
