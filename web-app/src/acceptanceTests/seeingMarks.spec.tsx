import {
  exampleQuestionAnsweredState,
  exampleQuizSummary,
  exampleRoundMarkedState,
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import { render, screen } from '@testing-library/react';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import React from 'react';
import { receiveNextQuizState } from '../testSupport/receiveNextQuizState';
import ReactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('seeing marks', () => {
  beforeEach(() => {
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({
      search: '',
    });
  });

  it("shows the player's marks", async () => {
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
          numberOfQuestions: 10,
          questions: [
            {
              number: 0,
              text: 'The first question',
              answer: 'The first answer',
            },
            { number: 1, text: 'The last question', answer: 'The last answer' },
          ],
        },
      ],
    };

    render(
      <TestAppContainer
        client={createMockGraphQlClient()}
        initialQuizState={initialQuizState}
      >
        <App />
      </TestAppContainer>,
    );

    receiveNextQuizState(exampleRoundMarkedState);

    expect(await screen.findByText('Round 1')).toBeInTheDocument();
    expect(await screen.findByText('Marks')).toBeInTheDocument();
  });
});
