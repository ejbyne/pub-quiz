import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { QuestionAskedState } from '../QuestionAskedState';

describe('QuestionAskedState', () => {
  describe('nextState', () => {
    it('should return the next question if the first question has been asked', () => {
      const state = new QuestionAskedState(exampleRounds, 0, 0);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUESTION_ASKED,
        roundNumber: 0,
        questionNumber: 1,
      });
    });

    it('should finish the round if there are no more questions', () => {
      const state = new QuestionAskedState(exampleRounds, 0, 1)

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.ROUND_FINISHED,
        roundNumber: 0,
      });
    });
  });

  describe('questionText and questionOptions', () => {
    it('returns the question text and options', () => {
      const state = new QuestionAskedState(exampleRounds, 0, 0);

      expect(state.questionText).toBe('Question 1');
      expect(state.questionOptions).toEqual([
        'Answer 1',
        'Answer 1b',
        'Answer 1c',
      ]);
    });
  });
});
