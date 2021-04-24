import { createAuthLink, AUTH_TYPE } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import { InMemoryCache, ApolloClient, ApolloLink } from '@apollo/react-hooks';
import fragmentTypes from './fragmentTypes.json';

import { awsConfig } from '../awsConfig';
import { getSession } from '@pub-quiz/web-app/src/components/withAuth';

const { apiKey, graphQlUrl, region } = awsConfig;

const apiKeyAuthLink = createAuthLink({
  url: graphQlUrl,
  region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey,
  },
});

const userPoolAuthLink = createAuthLink({
  url: graphQlUrl,
  region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: () => {
      return getSession().getIdToken().getJwtToken();
    },
  },
});

const splitAuthLink = ApolloLink.split(
  (operation) => isAdminResource(operation.operationName),
  userPoolAuthLink,
  apiKeyAuthLink,
);

const subscriptionHandshakeLink = createSubscriptionHandshakeLink({
  url: graphQlUrl,
  region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey,
  },
});

const link = ApolloLink.from([splitAuthLink, subscriptionHandshakeLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    possibleTypes: fragmentTypes.possibleTypes,
  }),
});

const isAdminResource = (operationName: string) => {
  return operationName === 'Quizzes';
};
