import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { RoundFinished } from '../RoundFinished';

describe('RoundFinished', () => {
  it('should return the first answer if the round has finished', () => {
    const state = new RoundFinished(exampleRounds, 0)

    expect(state.nextState()).toMatchObject({
      status: QuizStatus.QUESTION_ANSWERED,
      roundNumber: 0,
      questionNumber: 0,
    });
  });
});
