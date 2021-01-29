import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuestionAnsweredState } from '../QuestionAnsweredState';

describe('QuestionAnsweredState', () => {
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
