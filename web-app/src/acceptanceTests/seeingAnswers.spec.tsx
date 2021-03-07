import {
  exampleQuestionAnsweredState,
  exampleQuizSummary,
  exampleRoundFinishedState,
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

describe('seeing answers', () => {
  beforeEach(() => {
    (ReactRouterDom.useLocation as jest.Mock).mockReturnValue({
      search: '',
    });
  });

  it('shows the question answers', async () => {
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
        initialQuizState={initialQuizState}
      >
        <App />
      </TestAppContainer>,
    );

    receiveNextQuizState(exampleQuestionAnsweredState);

    expect(await findByText('Question 1')).toBeTruthy();
    expect(await findByText('The first question')).toBeTruthy();
    expect(await findByText('Correct answer: The first answer')).toBeTruthy();
  });

  it('reloads the round data in case the player is missing any answers', async () => {
    const mockQuizSummaryQuery = jest.fn().mockResolvedValue({
      ...exampleQuizSummary,
      state: {
        ...exampleQuestionAnsweredState,
        question: {
          number: 1,
          text: 'The second question',
          answer: 'The second answer',
        },
      },
      currentRound: [
        {
          __typename: 'QuestionWithAnswer',
          number: 0,
          text: 'The first question',
          answer: 'The first answer',
        },
        {
          __typename: 'QuestionWithAnswer',
          number: 1,
          text: 'The second question',
          answer: 'The second answer',
        },
        {
          __typename: 'QuestionWithoutAnswer',
          number: 2,
          text: 'The third question',
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
    expect(
      await screen.findByText('Correct answer: The first answer'),
    ).toBeInTheDocument();
    expect(await screen.findByText('The second question')).toBeInTheDocument();
    expect(
      await screen.findByText('Correct answer: The second answer'),
    ).toBeInTheDocument();
    expect(await screen.findByText('The third question')).toBeInTheDocument();
    expect(
      screen.queryByText('Correct answer: The third answer'),
    ).not.toBeInTheDocument();
  });
});
