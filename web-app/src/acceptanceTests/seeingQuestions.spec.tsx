import {
  exampleQuestionAskedState,
  exampleQuizSummary,
  exampleRoundFinishedState, exampleRoundStartedState,
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import { render } from '@testing-library/react';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import { receiveNextQuizState } from '../testSupport/receiveNextQuizState';
import React from 'react';

describe('seeing questions', () => {
  it('asks the first question', async () => {
    const initialQuizState = {
      ...exampleQuizSummary,
      state: exampleRoundStartedState,
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
          questions: [],
        },
      ],
    };

    const { findByText } = render(
      <TestAppContainer
        client={createMockGraphQlClient()}
        initialQuizState={initialQuizState}>
        <App />
      </TestAppContainer>,
    );

    receiveNextQuizState(exampleQuestionAskedState);

    expect(await findByText('Question 1')).toBeTruthy();
    expect(await findByText('The first question')).toBeTruthy();
  });

  it('asks the second question', async () => {
    const initialQuizState = {
      ...exampleQuizSummary,
      state: exampleQuestionAskedState,
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
          questions: [
            {
              number: 0,
              text: 'The first question',
            },
          ],
        },
      ],
    };

    const { findByText } = render(
      <TestAppContainer
        client={createMockGraphQlClient()}
        initialQuizState={initialQuizState}>
        <App />
      </TestAppContainer>,
    );

    receiveNextQuizState({
      ...exampleQuestionAskedState,
      question: {
        number: 1,
        text: 'The second question',
      },
    });

    expect(await findByText('Question 1')).toBeTruthy();
    expect(await findByText('The first question')).toBeTruthy();

    expect(await findByText('Question 2')).toBeTruthy();
    expect(await findByText('The second question')).toBeTruthy();
  });

  it('finishes a round', async () => {
    const initialQuizState = {
      ...exampleQuizSummary,
      state: {
        ...exampleQuestionAskedState,
        question: {
          number: 1,
          text: 'The last question',
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
        initialQuizState={initialQuizState}>
        <App />
      </TestAppContainer>,
    );

    receiveNextQuizState(exampleRoundFinishedState);

    expect(await findByText('Round 1 completed')).toBeTruthy();
  });
});
