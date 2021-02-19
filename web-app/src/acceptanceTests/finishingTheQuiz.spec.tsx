import { exampleQuestionAnsweredState, exampleQuizSummary } from '@pub-quiz/shared/src/testSupport/testFixtures';
import { render } from '@testing-library/react';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import { receiveNextQuizState } from '../testSupport/receiveNextQuizState';
import { QuizStatus } from '@pub-quiz/shared/src/graphql/types';
import React from 'react';

it('finishes the quiz', async () => {
  const initialQuizState = {
    ...exampleQuizSummary,
    state: {
      ...exampleQuestionAnsweredState,
      question: {
        number: 1,
        text: 'The second question',
        answer: 'The second answer',
      },
    },
    rounds: [
      {
        roundNumber: 0,
        roundName: 'The first round',
        numberOfQuestions: 2,
        questions: [
          { number: 0, text: 'The first question' },
          { number: 1, text: 'The last question' },
        ],
      },
    ],
  };

  const { findByText } = render(
    <TestAppContainer
      client={createMockGraphQlClient()}
      initialState={initialQuizState}>
      <App />
    </TestAppContainer>,
  );

  receiveNextQuizState({
    __typename: 'QuizFinished',
    quizId: 'RANDOM_ID',
    status: QuizStatus.QuizFinished,
  });

  expect(await findByText('Quiz complete')).toBeTruthy();
});
