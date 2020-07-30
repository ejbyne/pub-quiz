import React from 'react';
import { createMockGraphQlClient } from './support/mockGraphQlClient';
import { App } from '../components/App';
import { exampleQuiz } from './support/testFixtures';
import { render } from '@testing-library/react-native';
import { TestAppContainer } from './support/TestAppContainer';
import { QuizStatus, QuizState } from '../graphql/types';
import { Quiz } from '../domain/quizReducer';

describe('round', () => {
  it('starts the first round when the quiz starts', async () => {
    const nextQuizState = jest.fn().mockReturnValue({
      __typename: 'RoundStarted',
      quizId: 'RANDOM_ID',
      status: QuizStatus.RoundStarted,
      roundNumber: 0,
      roundName: 'The first round',
      numberOfQuestions: 10,
    });

    const client = createMockGraphQlClient({
      mockSubscriptionResolvers: { nextQuizState },
    });

    const { findByText } = render(
      <TestAppContainer
        client={client}
        initialState={exampleQuiz as Partial<Quiz>}>
        <App />
      </TestAppContainer>,
    );

    expect(await findByText('Round 1')).toBeTruthy();
    expect(await findByText('The first round')).toBeTruthy();
  });

  it('asks the first question', async () => {
    const nextQuizState = jest.fn().mockReturnValue({
      __typename: 'QuestionAsked',
      quizId: 'RANDOM_ID',
      status: QuizStatus.QuestionAsked,
      roundNumber: 0,
      questionNumber: 0,
      questionText: 'The first question',
    });

    const client = createMockGraphQlClient({
      mockSubscriptionResolvers: { nextQuizState },
    });

    const { findByText } = render(
      <TestAppContainer
        client={client}
        initialState={{
          ...exampleQuiz,
          state: {
            quizId: 'RANDOM_ID',
            status: QuizStatus.RoundStarted,
            roundNumber: 0,
            roundName: 'The first round',
            numberOfQuestions: 10,
          } as QuizState,
        }}>
        <App />
      </TestAppContainer>,
    );

    expect(await findByText('Question 1')).toBeTruthy();
    expect(await findByText('The first question')).toBeTruthy();
  });
});
