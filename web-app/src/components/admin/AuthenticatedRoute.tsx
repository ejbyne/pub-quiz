import React from 'react';
import { useIsAuthenticated } from '@pub-quiz/shared/src/hooks/useIsAuthenticated';
import { Redirect, Route } from 'react-router-dom';

export const AuthenticatedRoute: React.FC<{ path: string }> = ({
  children,
  ...rest
}) => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};
