import {
  exampleQuestionAnsweredState,
  exampleQuestionAskedState,
  exampleQuizSummary,
} from '@pub-quiz/shared/src/testSupport/testFixtures';
import { TestAppContainer } from '@pub-quiz/shared/src/testSupport/TestAppContainer';
import { render, screen } from '@testing-library/react';
import { createMockGraphQlClient } from '@pub-quiz/shared/src/testSupport/mockGraphQlClient';
import { App } from '../components/App';
import userEvent from '@testing-library/user-event';

describe('saving answers', () => {
  it("submits the player's marks", async () => {
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

    await render(
      <TestAppContainer
        client={createMockGraphQlClient()}
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
});
