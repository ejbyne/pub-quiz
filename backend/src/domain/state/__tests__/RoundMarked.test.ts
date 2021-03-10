import { RoundMarked } from '../RoundMarked';
import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';

describe('RoundMarked', () => {
  describe('nextState', () => {
    it('should move to the next round', () => {
      const state = new RoundMarked(exampleRounds, {}, 0);

      expect(state.nextState()).toMatchObject({
        status: QuizStatus.ROUND_STARTED,
        roundNumber: 1,
      });
    });
  });

  describe('marks', () => {
    it('should reveal the marks for the current and previous rounds', () => {
      const state = new RoundMarked(exampleRounds, {}, 0);
    });
  });
});
