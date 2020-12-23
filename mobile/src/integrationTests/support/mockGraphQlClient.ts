import { InMemoryCache, ApolloClient } from '@apollo/client';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { readFileSync } from 'fs';
import { join } from 'path';
import fragmentTypes from '../../../shared/graphql/fragmentTypes.json';

const schemaString =
  'directive @aws_subscribe(mutations : [String]!) on FIELD_DEFINITION \n' +
  readFileSync(
    join(__dirname, '../../../../backend/src/infrastructure/schema.graphql'),
    'utf-8',
  );

export const createMockGraphQlClient = (mockResolvers?: {
  mockQueryResolvers?: Record<string, jest.Mock>;
  mockMutationResolvers?: Record<string, jest.Mock>;
}): ApolloClient<any> => {
  const resolvers = {
    Query: {
      ...mockResolvers?.mockQueryResolvers,
    },
    Mutation: {
      ...mockResolvers?.mockMutationResolvers,
    },
  };

  const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers });

  return new ApolloClient({
    link: new SchemaLink({
      schema,
    }) as any,
    cache: new InMemoryCache({
      possibleTypes: fragmentTypes.possibleTypes,
    }),
  });
};
