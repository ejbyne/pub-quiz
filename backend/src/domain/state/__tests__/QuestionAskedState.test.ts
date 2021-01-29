import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuestionAskedState } from '../QuestionAskedState';

describe('QuestionAskedState', () => {
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
