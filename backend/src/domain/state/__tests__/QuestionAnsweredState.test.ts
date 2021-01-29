import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { QuestionAnsweredState } from '../QuestionAnsweredState';

describe('QuestionAnsweredState', () => {
  describe('nextState', () => {
    it('should return the next answer if the first question has been answered', () => {
      const state = new QuestionAnsweredState(exampleRounds, 0, 0);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUESTION_ANSWERED,
        roundNumber: 0,
        questionNumber: 1,
      });
    });

    it('should move to the next round if all of the questions have been answered', () => {
      const state = new QuestionAnsweredState(exampleRounds, 0, 1);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.ROUND_STARTED,
        roundNumber: 1,
      });
    });

    it('should finish the quiz at the end of the last round', () => {
      const state = new QuestionAnsweredState(exampleRounds, 1, 0);

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
              question: 'Question 1',
              answer: 'Answer 1',
            },
            {
              question: 'Question 2',
              answer: 'Answer 2',
            },
          ],
        },
        {
          roundName: 'Round 2',
          questions: [],
        },
      ];

      const state = new QuestionAnsweredState(
        roundsWithNoQuestionsInSecondRound,
        0,
        1
      );

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUIZ_FINISHED,
      });
    });
  });

  describe('questionText, questionAnswer and questionOptions', () => {
    it('returns the question text, answer and options', () => {
      const state = new QuestionAnsweredState(exampleRounds, 0, 0);

      expect(state.questionText).toBe('Question 1');
      expect(state.questionAnswer).toBe('Answer 1');
      expect(state.questionOptions).toEqual([
        'Answer 1',
        'Answer 1b',
        'Answer 1c',
      ]);
    });
  });
});
