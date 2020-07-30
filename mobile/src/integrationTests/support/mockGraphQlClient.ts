import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from 'apollo-link-schema';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { readFileSync } from 'fs';
import { join } from 'path';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import ApolloClient from 'apollo-client';

const schemaString =
  'directive @aws_subscribe(mutations : [String]!) on FIELD_DEFINITION \n' +
  readFileSync(
    join(__dirname, '../../../../backend/src/infrastructure/schema.graphql'),
    'utf-8',
  );

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

export const createMockGraphQlClient = (mockResolvers: {
  mockQueryResolvers?: Record<string, jest.Mock>;
  mockMutationResolvers?: Record<string, jest.Mock>;
  mockSubscriptionResolvers?: Record<string, any>;
}): ApolloClient<any> => {
  const resolvers = {
    Query: {
      ...mockResolvers.mockQueryResolvers,
    },
    Mutation: {
      ...mockResolvers.mockMutationResolvers,
    },
    Subscription: {
      ...mockResolvers.mockSubscriptionResolvers,
    },
  };

  const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers });

  return new ApolloClient({
    link: new SchemaLink({
      schema,
      // schema: addMocksToSchema({
      //   schema,
      //   preserveResolvers: true,
      // }),
    }),
    cache,
  });
};
