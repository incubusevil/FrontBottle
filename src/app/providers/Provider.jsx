import React from 'react';
import { StylesProvider } from './StylesProvider';
import { ContextProvider } from './ContextProvider';
import { RouteProvider } from './RouteProvider';

export function Provider({ children }) {
  return (
    <RouteProvider>
      <StylesProvider>
        <ContextProvider>
          {children}
        </ContextProvider>
      </StylesProvider>
    </RouteProvider>
  );
}
