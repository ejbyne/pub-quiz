import React, { createContext } from 'react';
import { useProvideIsAuthenticated } from '@pub-quiz/shared/src/hooks/useProvideIsAuthenticated';

export const AuthContext = createContext(false);

export const IsAuthenticatedProvider: React.FC = ({ children }) => {
  const isAuthenticated = useProvideIsAuthenticated();
  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};
