import {
  exampleQuestionAskedState,
  exampleQuizSummary,
  exampleRoundFinishedState,
  exampleRoundStartedState,
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import { render, screen } from '@testing-library/react';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import { receiveNextQuizState } from '../testSupport/receiveNextQuizState';
import React from 'react';
import ReactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('seeing questions', () => {
  beforeEach(() => {
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({
      search: '',
    });
  });

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

    render(
      <TestAppContainer
        client={createMockGraphQlClient()}
        initialQuizState={initialQuizState}
      >
        <App />
      </TestAppContainer>,
    );

    receiveNextQuizState(exampleQuestionAskedState);

    expect(await screen.findByText('Question 1')).toBeTruthy();
    expect(await screen.findByText('The first question')).toBeTruthy();
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

    render(
      <TestAppContainer
        client={createMockGraphQlClient()}
        initialQuizState={initialQuizState}
      >
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

    expect(await screen.findByText('Question 1')).toBeTruthy();
    expect(await screen.findByText('The first question')).toBeTruthy();

    expect(await screen.findByText('Question 2')).toBeTruthy();
    expect(await screen.findByText('The second question')).toBeTruthy();
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

    render(
      <TestAppContainer
        client={createMockGraphQlClient()}
        initialQuizState={initialQuizState}
      >
        <App />
      </TestAppContainer>,
    );

    receiveNextQuizState(exampleRoundFinishedState);

    expect(await screen.findByText('Round 1 completed')).toBeTruthy();
  });

  it('reloads the round data in case the player is missing any questions', async () => {
    const mockQuizSummaryQuery = jest.fn().mockResolvedValue({
      ...exampleQuizSummary,
      state: {
        ...exampleQuestionAskedState,
        question: {
          number: 1,
          text: 'The second question',
        },
      },
      currentRound: [
        {
          __typename: 'QuestionWithoutAnswer',
          number: 0,
          text: 'The first question',
        },
        {
          __typename: 'QuestionWithoutAnswer',
          number: 1,
          text: 'The second question',
        },
      ],
    });

    render(
      <TestAppContainer
        client={createMockGraphQlClient({
          mockQueryResolvers: {
            quizSummary: mockQuizSummaryQuery,
          },
        })}
        initialQuizState={{
          quizId: 'RANDOM_ID',
          rounds: [],
        }}
      >
        <App />
      </TestAppContainer>,
    );

    expect(mockQuizSummaryQuery).toHaveBeenCalled();

    expect(await screen.findByText('The first question')).toBeInTheDocument();
    expect(await screen.findByText('The second question')).toBeInTheDocument();
  });
});
