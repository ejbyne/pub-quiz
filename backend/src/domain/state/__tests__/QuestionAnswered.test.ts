import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { QuestionAnswered } from '../QuestionAnswered';

describe('QuestionAnswered', () => {
  describe('nextState', () => {
    it('should return the next answer if the first question has been answered', () => {
      const state = new QuestionAnswered(exampleRounds, 0, 0);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUESTION_ANSWERED,
        roundNumber: 0,
        questionNumber: 1,
      });
    });

    it('should move to the next round if all of the questions have been answered', () => {
      const state = new QuestionAnswered(exampleRounds, 0, 1);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.ROUND_STARTED,
        roundNumber: 1,
      });
    });

    it('should finish the quiz at the end of the last round', () => {
      const state = new QuestionAnswered(exampleRounds, 1, 0);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUIZ_FINISHED,
      });
    });

    it('should skip the second round if there are no questions', () => {
      const roundsWithNoQuestionsInSecondRound = [
        {
          roundName: 'Round 1',
          questions: [
            {
              text: 'Question 1',
              answer: 'Answer 1',
            },
            {
              text: 'Question 2',
              answer: 'Answer 2',
            },
          ],
        },
        {
          roundName: 'Round 2',
          questions: [],
        },
      ];

      const state = new QuestionAnswered(
        roundsWithNoQuestionsInSecondRound,
        0,
        1
      );

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUIZ_FINISHED,
      });
    });
  });

  describe('questions', () => {
    it('returns the question number, text, answer and options', () => {
      const state = new QuestionAnswered(exampleRounds, 0, 0);

      expect(state.question).toEqual({
        number: 0,
        text: 'Question 1',
        options: ['Answer 1', 'Answer 1b', 'Answer 1c'],
        answer: 'Answer 1',
      });
    });
  });

  describe('currentRound', () => {
    it('returns all of the questions plus the answers which have been given in the round', () => {
      const rounds = [
        {
          roundName: 'Round 1',
          questions: [
            {
              text: 'Question 1',
              answer: 'Answer 1',
              options: ['Answer 1', 'Answer 1b', 'Answer 1c'],
            },
            {
              text: 'Question 2',
              answer: 'Answer 2',
            },
            {
              text: 'Question 3',
              answer: 'Answer 3',
            },
          ],
        },
      ];

      const state = new QuestionAnswered(rounds, 0, 1);

      expect(state.currentRound).toEqual([
        {
          number: 0,
          text: 'Question 1',
          options: ['Answer 1', 'Answer 1b', 'Answer 1c'],
          answer: 'Answer 1',
        },
        {
          number: 1,
          text: 'Question 2',
          answer: 'Answer 2',
        },
        {
          number: 2,
          text: 'Question 3',
        },
      ]);
    });
  });
});
