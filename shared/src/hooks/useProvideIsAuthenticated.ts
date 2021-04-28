import React from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

let session: CognitoUserSession;
export const getSession = () => session;

export const useProvideIsAuthenticated = (): boolean => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      session = (authData as any)?.signInUserSession;
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user;
};
