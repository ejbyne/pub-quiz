import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { BaseQuizState } from '../BaseQuizState';

describe('BaseQuizState', () => {
  describe('roundSummary', () => {
    it('returns undefined if there is no current round', () => {
      const quizState = new BaseQuizState(
        QuizStatus.QUIZ_NOT_YET_STARTED,
        exampleRounds
      );

      expect(quizState.roundSummary).toBe(undefined);
    });

    it('returns the round summary if there is a current round', () => {
      const quizState = new BaseQuizState(
        QuizStatus.ROUND_STARTED,
        exampleRounds,
        0
      );

      expect(quizState.roundSummary).toEqual({
        roundNumber: 0,
        roundName: 'Round 1',
        numberOfQuestions: 2,
      });
    });
  });
});
