import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { RoundFinishedState } from '../RoundFinishedState';

describe('RoundFinishedState', () => {
  it('should return the first answer if the round has finished', () => {
    const state = new RoundFinishedState(exampleRounds, 0)

    expect(state.nextState()).toMatchObject({
      status: QuizStatus.QUESTION_ANSWERED,
      roundNumber: 0,
      questionNumber: 0,
    });
  });
});
