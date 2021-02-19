import { exampleQuizSummary, exampleRoundStartedState } from '@pub-quiz/shared/src/testSupport/testFixtures';
import { render } from '@testing-library/react';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import { receiveNextQuizState } from '../testSupport/receiveNextQuizState';
import React from 'react';

describe('starting the quiz', () => {
  it('starts the first round', async () => {
    const initialQuizState = {
      ...exampleQuizSummary,
      rounds: [],
    };

    const {findByText} = render(
      <TestAppContainer
        client={createMockGraphQlClient()}
        initialQuizState={initialQuizState}>
        <App/>
      </TestAppContainer>,
    );

    receiveNextQuizState(exampleRoundStartedState);

    expect(await findByText('Round 1')).toBeTruthy();
    expect(await findByText('The first round')).toBeTruthy();
  });
});
