import React from 'react';
import { createMockGraphQlClient, pubsub } from './support/mockGraphQlClient';
import { App } from '../components/App';
import { exampleQuiz } from './support/testFixtures';
import { render } from '@testing-library/react-native';
import { TestAppContainer } from './support/TestAppContainer';
import { QuizStatus } from '../graphql/types';
import { Quiz } from '../domain/quizReducer';

describe('questions', () => {
  it('starts the first round when the quiz starts', async () => {
    const quizSummary = jest.fn().mockReturnValue(exampleQuiz);

    const joinQuiz = jest.fn().mockReturnValue({
      quizId: 'RANDOM_ID',
      playerName: 'Ed',
    });

    const nextQuizState = jest.fn().mockReturnValue({
      __typename: 'RoundStarted',
      quizId: 'RANDOM_ID',
      status: QuizStatus.RoundStarted,
      roundNumber: 0,
      roundName: 'The first round',
      numberOfQuestions: 10,
    });

    const client = createMockGraphQlClient({
      mockQueryResolvers: { quizSummary },
      mockMutationResolvers: {
        joinQuiz,
      },
      mockSubscriptionResolvers: {
        nextQuizState,
      },
    });

    const { findByText } = render(
      <TestAppContainer
        client={client}
        initialState={exampleQuiz as Partial<Quiz>}>
        <App />
      </TestAppContainer>,
    );

    expect(
      await findByText('You are in the round: The first round'),
    ).toBeTruthy();
  });
});
