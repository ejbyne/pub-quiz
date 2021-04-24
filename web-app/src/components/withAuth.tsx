import React from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Layout } from './Layout';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

let session: CognitoUserSession;
export const getSession = () => session;

export const withAuth = (Component: React.FC<any>) => {
  const ComponentWithAuth: React.FC<any> = (props) => {
    const [authState, setAuthState] = React.useState<AuthState>();
    const [user, setUser] = React.useState<any>();

    React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
        session = (authData as any)?.signInUserSession;
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

    return <Component {...props} />;
  };

  return ComponentWithAuth;
};
