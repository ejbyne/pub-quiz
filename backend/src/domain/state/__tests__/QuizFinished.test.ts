import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizFinished } from '../QuizFinished';
import { QuizStatus } from '../../types';

describe('QuizFinished', () => {
  describe('nextState', () => {
    it('remains in the finished state', () => {
      const state = new QuizFinished(exampleRounds, {});
      expect(state.nextState()).toMatchObject({
        status: QuizStatus.QUIZ_FINISHED,
      });
    });
  });

  describe('marks', () => {
    it('shows the latest marks', () => {
      const answers = {
        Ed: [[{ answer: 'Round 1 - Answer 1', mark: 1 }]],
      };
      const state = new QuizFinished(exampleRounds, answers);

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
