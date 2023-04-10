import React, { createContext, useState } from 'react';

export const Context = createContext();

export function ContextProvider({ children }) {
  const contextControl = useState({
    user: null,
    token: null,
  });

  return (
    <Context.Provider value={contextControl}>
      {children}
    </Context.Provider>
  );
}
