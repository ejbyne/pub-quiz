import ApolloClient from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { SchemaLink } from 'apollo-link-schema';
import { readFileSync } from 'fs';
import { join } from 'path';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';

const schemaString =
  'directive @aws_subscribe(mutations : [String]!) on FIELD_DEFINITION \n' +
  readFileSync(
    join(__dirname, '../../../../backend/src/infrastructure/schema.graphql'),
    'utf-8',
  );

const schema = makeExecutableSchema({ typeDefs: schemaString });

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

export const createMockGraphQlClient = (mockResolvers: {
  mockQueryResolvers?: Record<string, jest.Mock>;
  mockMutationResolvers?: Record<string, jest.Mock>;
}) =>
  new ApolloClient({
    link: new SchemaLink({
      schema: addMocksToSchema({
        schema,
        mocks: {
          Query: () => ({
            ...mockResolvers.mockQueryResolvers,
          }),
          Mutation: () => ({
            ...mockResolvers.mockMutationResolvers,
          }),
        },
      }),
    }),
    cache,
  });
