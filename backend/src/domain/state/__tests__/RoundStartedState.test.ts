import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { RoundStartedState } from '../RoundStartedState';

describe('RoundStartedState', () => {
  it('should return the first question after the round has started', () => {
    const state = new RoundStartedState(exampleRounds, 0);

    expect(state.nextState()).toMatchObject({
      status: QuizStatus.QUESTION_ASKED,
      roundNumber: 0,
      questionNumber: 0,
    });
  });
});
