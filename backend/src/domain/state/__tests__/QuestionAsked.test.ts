import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { QuestionAsked } from '../QuestionAsked';

describe('QuestionAsked', () => {
  describe('nextState', () => {
    it('should return the next question if the first question has been asked', () => {
      const state = new QuestionAsked(exampleRounds, 0, 0);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUESTION_ASKED,
        roundNumber: 0,
        questionNumber: 1,
      });
    });

    it('should finish the round if there are no more questions', () => {
      const state = new QuestionAsked(exampleRounds, 0, 1);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.ROUND_FINISHED,
        roundNumber: 0,
      });
    });
  });

  describe('question', () => {
    it('returns the question number text and options', () => {
      const state = new QuestionAsked(exampleRounds, 0, 0);

      expect(state.question).toEqual({
        number: 0,
        text: 'Question 1',
        options: ['Answer 1', 'Answer 1b', 'Answer 1c'],
      });
    });
  });
});
