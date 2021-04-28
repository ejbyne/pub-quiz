import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import { Layout } from './Layout';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { useIsAuthenticated } from '@pub-quiz/shared/src/hooks/useIsAuthenticated';

export const Login: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      const { from } = location.state || { from: { pathname: '/my-quizzes' } };
      history.replace(from);
    }
  }, [history, location, isAuthenticated]);

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
};
