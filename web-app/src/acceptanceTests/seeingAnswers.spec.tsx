import {
  exampleQuestionAnsweredState,
  exampleQuizSummary,
  exampleRoundFinishedState,
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import { render } from '@testing-library/react';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import { receiveNextQuizState } from '../testSupport/receiveNextQuizState';
import React from 'react';

describe('seeing answers', () => {
  it('shows the question answeers', async () => {
    const initialQuizState = {
      ...exampleQuizSummary,
      state: exampleRoundFinishedState,
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
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

    receiveNextQuizState(exampleQuestionAnsweredState);

    expect(await findByText('Question 1')).toBeTruthy();
    expect(await findByText('The first question')).toBeTruthy();
    expect(await findByText('Answer: The first answer')).toBeTruthy();
  });
});
