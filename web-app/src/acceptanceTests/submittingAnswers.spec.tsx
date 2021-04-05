import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  exampleQuestionAskedState,
  exampleQuizSummary,
  exampleRoundFinishedState,
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import { App } from '../components/App';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { receiveNextQuizState } from '../testSupport/receiveNextQuizState';

describe('submitting answers', () => {
  it("submits the player's answers", async () => {
    const mockSubmitAnswers = jest.fn().mockReturnValue({
      quizId: 'RANDOM_ID',
      playerName: 'Henry',
    });

    const initialQuizState = {
      ...exampleQuizSummary,
      state: {
        ...exampleQuestionAskedState,
        question: {
          number: 1,
          text: 'The second question',
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

    await act(async () => {
      await render(
        <TestAppContainer
          client={createMockGraphQlClient({
            mockMutationResolvers: {
              submitAnswers: mockSubmitAnswers,
            },
          })}
          initialQuizState={initialQuizState}
        >
          <App />
        </TestAppContainer>,
      );

      userEvent.type(
        await screen.findByPlaceholderText('Answer 1'),
        'My first answer',
      );
      userEvent.type(
        await screen.findByPlaceholderText('Answer 2'),
        'My second answer',
      );

      receiveNextQuizState(exampleRoundFinishedState);

      userEvent.click(await screen.findByText('Submit answers'));
    });

    expect(mockSubmitAnswers).toHaveBeenCalledWith(
      undefined,
      {
        input: {
          quizId: 'RANDOM_ID',
          playerName: 'Ed',
          roundNumber: 0,
          answers: ['My first answer', 'My second answer'],
        },
      },
      undefined,
      expect.anything(),
    );
  });

  it('hides the submit button until the round has been completed', async () => {
    const initialQuizState = {
      ...exampleQuizSummary,
      state: exampleQuestionAskedState,
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 2,
          questions: [{ number: 0, text: 'The first question' }],
        },
      ],
    };

    await act(async () => {
      await render(
        <TestAppContainer
          client={createMockGraphQlClient()}
          initialQuizState={initialQuizState}
        >
          <App />
        </TestAppContainer>,
      );

      expect(screen.queryByText('Submit answers')).not.toBeInTheDocument();
    });
  });
});
