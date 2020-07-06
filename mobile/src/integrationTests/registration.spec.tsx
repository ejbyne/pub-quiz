import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { SchemaLink } from 'apollo-link-schema';
import { readFileSync } from 'fs';
import { join } from 'path';
import { App } from '../components/App';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { QuizStatus } from '../graphql/types';
import introspectionQueryResultData from '../graphql/fragmentTypes.json';

const schemaString =
  'directive @aws_subscribe(mutations : [String]!) on FIELD_DEFINITION \n' +
  readFileSync(
    join(__dirname, '../../../backend/src/infrastructure/schema.graphql'),
    'utf-8',
  );

const schema = makeExecutableSchema({ typeDefs: schemaString });

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

describe('registration', () => {
  it('allows a player to register for a quiz with the provided id', async () => {
    const client = new ApolloClient({
      link: new SchemaLink({
        schema: addMocksToSchema({ schema, mocks: {
          Query: () => ({
            quizSummary: () => ({
              quizId: 'RANDOM_ID',
              quizName: 'Random Quiz',
              playerNames: null,
              rounds: [],
              state: {
                __typename: 'QuizNotYetStarted',
                quizId: 'RANDOM_ID',
                status: QuizStatus.QuizNotYetStarted,
              },
            }),
          }),
        } }),
      }),
      cache,
    });

    const { getByPlaceholderText, getByText, findByText } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'Ed');
    fireEvent.changeText(getByPlaceholderText('Quiz ID'), 'A_RANDOM_ID');
    fireEvent.press(getByText('Join quiz'));

    expect(
      await findByText('You have joined the quiz: Random Quiz'),
    ).toBeTruthy();
  });
});
