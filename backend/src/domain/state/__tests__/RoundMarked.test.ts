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
    it('shows the latest marks', () => {
      const answers = {
        Ed: [[{ answer: 'Round 1 - Answer 1', mark: 1 }]],
      };
      const state = new RoundMarked(exampleRounds, answers, 0);

      expect(state.marks).toEqual([
        {
          playerName: 'Ed',
          rounds: [{ marks: [1], roundTotal: 1 }],
          quizTotal: 1,
        },
      ]);
    });
  });
});
