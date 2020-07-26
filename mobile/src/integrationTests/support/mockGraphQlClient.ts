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
import { PubSub } from 'graphql-subscriptions';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import { exampleQuiz } from './testFixtures';
import { QuizStatus } from '../../graphql/types';

const schemaString =
  'directive @aws_subscribe(mutations : [String]!) on FIELD_DEFINITION \n' +
  readFileSync(
    join(__dirname, '../../../../backend/src/infrastructure/schema.graphql'),
    'utf-8',
  );

export const pubsub = new PubSub();

const quizSummary = jest.fn().mockReturnValue(exampleQuiz);

const joinQuiz = jest.fn().mockReturnValue({
  quizId: 'RANDOM_ID',
  playerName: 'Ed',
});

const resolvers = {
  // Query: {
  //   quizSummary,
  // },
  // Mutation: {
  //   joinQuiz,
  // },
  // Subscription: {
  //   nextQuizState: {
  //     subscription: () => pubsub.asyncIterator('NEXT_STATE_TOPIC'),
  //   },
  // },
  // },
  // QuizState: {
  //   __resolveType(data: any) {
  //     return data.__typename;
  //   },
  // },
  // Subscription: {
  //   nextQuizState: {
  //     resolve: jest.fn().mockReturnValue({
  //       __typename: 'RoundStarted',
  //       quizId: 'RANDOM_ID',
  //       status: QuizStatus.RoundStarted,
  //       roundNumber: 0,
  //       roundName: 'The first round',
  //       numberOfQuestions: 10,
  //     }),
  //     subscription: () => {},
  //   },
  // },
};

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
