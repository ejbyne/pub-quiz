import { createAuthLink, AUTH_TYPE } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import {
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  createHttpLink,
} from '@apollo/react-hooks';
import fragmentTypes from './fragmentTypes.json';

import { awsConfig } from '../awsConfig';

const { apiKey, graphQlUrl, region } = awsConfig;

const auth = {
  type: AUTH_TYPE.API_KEY as 'API_KEY',
  apiKey,
};

const httpLink = createHttpLink({ uri: graphQlUrl, fetch });

const link = ApolloLink.from([
  createAuthLink({ url: graphQlUrl, region, auth }),
  createSubscriptionHandshakeLink(graphQlUrl, httpLink),
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    possibleTypes: fragmentTypes.possibleTypes,
  }),
});
