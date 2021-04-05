import {
  exampleQuestionAnsweredState,
  exampleQuizSummary,
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { act, render, screen } from '@testing-library/react';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import userEvent from '@testing-library/user-event';

describe('submitting marks', () => {
  it("submits the player's marks", async () => {
    const mockSubmitMarks = jest.fn().mockReturnValue({
      quizId: 'RANDOM_ID',
      playerName: 'Henry',
    });

    const quizState = {
      ...exampleQuizSummary,
      state: {
        ...exampleQuestionAnsweredState,
        question: {
          number: 1,
          text: 'The second question',
          answer: 'The last answer',
        },
      },
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 2,
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

    const answerSheetState = {
      playerName: 'Henry',
      rounds: [
        [{ answer: 'The first answer' }, { answer: 'The wrong answer' }],
      ],
    };

    await act(async () => {
      await render(
        <TestAppContainer
          client={createMockGraphQlClient({
            mockMutationResolvers: { submitMarks: mockSubmitMarks },
          })}
          initialQuizState={quizState}
          initialAnswerSheetState={answerSheetState}
        >
          <App />
        </TestAppContainer>,
      );

      userEvent.click(screen.getAllByTitle('Mark correct')[0]);
      userEvent.click(screen.getAllByTitle('Mark incorrect')[1]);
      userEvent.click(screen.getByText('Submit marks'));
    });

    expect(mockSubmitMarks).toHaveBeenCalledWith(
      undefined,
      {
        input: {
          quizId: 'RANDOM_ID',
          playerName: 'Henry',
          roundNumber: 0,
          marks: [1, 0],
        },
      },
      undefined,
      expect.anything(),
    );
  });

  it('disables the submit button until all questions have been marked', async () => {
    const mockSubmitMarks = jest.fn().mockReturnValue({
      quizId: 'RANDOM_ID',
      name: 'Henry',
    });

    const quizState = {
      ...exampleQuizSummary,
      state: {
        ...exampleQuestionAnsweredState,
        question: {
          number: 1,
          text: 'The second question',
          answer: 'The last answer',
        },
      },
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 2,
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

    const answerSheetState = {
      playerName: 'Henry',
      rounds: [
        [{ answer: 'The first answer' }, { answer: 'The wrong answer' }],
      ],
    };

    await act(async () => {
      await render(
        <TestAppContainer
          client={createMockGraphQlClient({
            mockMutationResolvers: { submitMarks: mockSubmitMarks },
          })}
          initialQuizState={quizState}
          initialAnswerSheetState={answerSheetState}
        >
          <App />
        </TestAppContainer>,
      );

      userEvent.click(screen.getAllByTitle('Mark correct')[0]);
      userEvent.click(screen.getByText('Submit marks'));
    });

    expect(mockSubmitMarks).not.toHaveBeenCalled();
  });

  it('automatically shows unanswered questions as incorrect', async () => {
    const mockSubmitMarks = jest.fn().mockReturnValue({
      quizId: 'RANDOM_ID',
      name: 'Henry',
    });

    const quizState = {
      ...exampleQuizSummary,
      state: {
        ...exampleQuestionAnsweredState,
        question: {
          number: 1,
          text: 'The second question',
          answer: 'The last answer',
        },
      },
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 2,
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

    const answerSheetState = {
      playerName: 'Henry',
      rounds: [[{ answer: 'The first answer' }]],
    };

    await act(async () => {
      await render(
        <TestAppContainer
          client={createMockGraphQlClient({
            mockMutationResolvers: { submitMarks: mockSubmitMarks },
          })}
          initialQuizState={quizState}
          initialAnswerSheetState={answerSheetState}
        >
          <App />
        </TestAppContainer>,
      );

      expect(
        screen.getAllByTitle('Mark incorrect')[1].parentElement,
      ).toHaveClass('bg-red-400');
    });

    userEvent.click(screen.getAllByTitle('Mark correct')[1]);

    expect(screen.getAllByTitle('Mark incorrect')[1].parentElement).toHaveClass(
      'bg-red-400',
    );
  });
});
