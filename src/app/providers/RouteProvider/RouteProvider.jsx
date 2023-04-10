import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export function RouteProvider({ children }) {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
}
