import { createAuthLink, AUTH_TYPE } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { awsConfig } from '../../awsConfig';
import introspectionQueryResultData from './fragmentTypes.json';

const { apiKey, graphQlUrl, region } = awsConfig;

const auth = {
  type: AUTH_TYPE.API_KEY as 'API_KEY',
  apiKey,
};

const httpLink = createHttpLink({ uri: graphQlUrl });

const link = ApolloLink.from([
  createAuthLink({ url: graphQlUrl, region, auth }),
  createSubscriptionHandshakeLink(graphQlUrl, httpLink),
]);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

export const client = new ApolloClient({
  link,
  cache,
});
