import React, { createContext, useContext, useEffect, useState } from 'react';

export type BoundaryContext = Record<string, any>;
const ErrorBoundaryContext = createContext({} as BoundaryContext);

export const ErrorBoundaryContextProvider: React.FC = (props) => {
  return (
    <ErrorBoundaryContext.Provider value={props.error}>
      {props.children}
    </ErrorBoundaryContext.Provider>
  );
};

export const useErrorBoundary = (): BoundaryContext => {
  return useContext(ErrorBoundaryContext);
};

export const useCatchEventErrors = () => {
  const [error, setError] = useState({});

  useEffect(() => {
    const errorHandler = (e) => {
      setError({ message: e.message, name: e.error, stack: e.filename });
      return true;
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  return error;
};
