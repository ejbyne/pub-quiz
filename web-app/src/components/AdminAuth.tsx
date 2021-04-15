import React, { PropsWithChildren } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Layout } from './Layout';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react';

export const AdminAuth: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<any>();

  console.log(authState, user);

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  if (authState !== AuthState.SignedIn || !user) {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center">
          <AmplifyAuthenticator>
            <AmplifySignUp
              usernameAlias="email"
              slot="sign-up"
              formFields={[{ type: 'email' }, { type: 'password' }]}
            />
            <AmplifySignIn
              usernameAlias="email"
              slot="sign-in"
              formFields={[{ type: 'email' }, { type: 'password' }]}
            />
          </AmplifyAuthenticator>
        </div>
      </Layout>
    );
  }

  return children;
};
