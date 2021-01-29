import { exampleRounds } from '../../../testSupport/testFixtures';
import { QuizStatus } from '../../types';
import { QuizNotYetStartedState } from '../QuizNotYetStartedState';

describe('QuizNotYetStartedState', () => {
  it('should start the first round if the quiz has not yet started', () => {
    const state = new QuizNotYetStartedState(exampleRounds)

    expect(state.nextState()).toMatchObject({
      status: QuizStatus.ROUND_STARTED,
      roundNumber: 0,
    });
  });

  it('should finish the game if there are no rounds at all', () => {
    const state = new QuizNotYetStartedState([])

    expect(state.nextState()).toMatchObject({
      status: QuizStatus.QUIZ_FINISHED,
    });
  });

  it('should skip the first round if there are no questions', () => {
    const roundsWithNoQuestionsInFirstRound = [
      {
        roundName: 'Round 1',
        questions: [],
      },
      {
        roundName: 'Round 2',
        questions: [
          {
            question: 'Question 3',
            answer: 'Answer 3',
          },
        ],
      },
    ];

    const state = new QuizNotYetStartedState(roundsWithNoQuestionsInFirstRound)

    expect(state.nextState()).toMatchObject({
      status: QuizStatus.ROUND_STARTED,
      roundNumber: 1,
    });
  });
});
