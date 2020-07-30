import React from 'react';
import { createMockGraphQlClient } from './support/mockGraphQlClient';
import { App } from '../components/App';
import { exampleQuiz } from './support/testFixtures';
import { render } from '@testing-library/react-native';
import { TestAppContainer } from './support/TestAppContainer';
import { QuizStatus } from '../graphql/types';

describe('round', () => {
  it('starts the first round when the quiz starts', async () => {
    const initialQuizState = exampleQuiz;

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
        initialState={initialQuizState}>
        <App />
      </TestAppContainer>,
    );

    expect(await findByText('Round 1')).toBeTruthy();
    expect(await findByText('The first round')).toBeTruthy();
  });

  it('asks a question', async () => {
    const initialQuizState = {
      ...exampleQuiz,
      state: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.RoundStarted,
        roundNumber: 0,
        roundName: 'The first round',
        numberOfQuestions: 10,
      },
    };

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
      <TestAppContainer client={client} initialState={initialQuizState}>
        <App />
      </TestAppContainer>,
    );

    expect(await findByText('Question 1')).toBeTruthy();
    expect(await findByText('The first question')).toBeTruthy();
  });

  it('finishes a round', async () => {
    const initialQuizState = {
      ...exampleQuiz,
      state: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.QuestionAsked,
        roundNumber: 0,
        questionNumber: 9,
        questionText: 'The last question',
      },
    };

    const nextQuizState = jest.fn().mockReturnValue({
      __typename: 'RoundFinished',
      quizId: 'RANDOM_ID',
      status: QuizStatus.RoundFinished,
      roundNumber: 0,
      roundName: 'Round 1',
      numberOfQuestions: 10,
    });

    const client = createMockGraphQlClient({
      mockSubscriptionResolvers: { nextQuizState },
    });

    const { findByText } = render(
      <TestAppContainer client={client} initialState={initialQuizState}>
        <App />
      </TestAppContainer>,
    );

    expect(await findByText('Round 1 complete')).toBeTruthy();
  });

  it('finishes the quiz', async () => {
    const initialQuizState = {
      ...exampleQuiz,
      state: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.RoundFinished,
        roundNumber: 0,
        roundName: 'Round 1',
        numberOfQuestions: 10,
      },
    };

    const nextQuizState = jest.fn().mockReturnValue({
      __typename: 'QuizFinished',
      quizId: 'RANDOM_ID',
      status: QuizStatus.QuizFinished,
    });

    const client = createMockGraphQlClient({
      mockSubscriptionResolvers: { nextQuizState },
    });

    const { findByText } = render(
      <TestAppContainer client={client} initialState={initialQuizState}>
        <App />
      </TestAppContainer>,
    );

    expect(await findByText('Quiz complete')).toBeTruthy();
  });
});
