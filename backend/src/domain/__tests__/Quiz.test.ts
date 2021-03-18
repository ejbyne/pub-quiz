import { Quiz } from '../Quiz';
import { QuizNotYetStarted } from '../state/QuizNotYetStarted';
import { exampleRounds } from '../../testSupport/testFixtures';
import { PlayerStatus } from '../types';
import { QuestionAsked } from '../state/QuestionAsked';

describe('Quiz', () => {
  it('returns a summary of the players', () => {
    const playerNames = ['Ed', 'Henry'];
    const answers = {
      Ed: [],
      Henry: [],
    };

    const quiz = new Quiz(
      'RANDOM_ID',
      "Ed's quiz",
      exampleRounds,
      new QuizNotYetStarted(exampleRounds, answers),
      playerNames,
      answers
    );

    expect(quiz.players).toEqual([
      { name: 'Ed', status: PlayerStatus.PLAYING },
      { name: 'Henry', status: PlayerStatus.PLAYING },
    ]);
  });

  it('changes the status after a player has submitted his answers', () => {
    const playerNames = ['Ed', 'Henry'];
    const answers = {
      Ed: [[{ answer: 'Round 1 answer 1' }]],
      Henry: [],
    };

    const quiz = new Quiz(
      'RANDOM_ID',
      "Ed's quiz",
      exampleRounds,
      new QuestionAsked(exampleRounds, answers, 0, 0),
      playerNames,
      answers
    );

    expect(quiz.players).toEqual([
      { name: 'Ed', status: PlayerStatus.ANSWERS_SUBMITTED },
      { name: 'Henry', status: PlayerStatus.PLAYING },
    ]);
  });

  it('changes the status after a player has submitted his marks', () => {
    const playerNames = ['Ed', 'Henry'];
    const answers = {
      Ed: [[{ answer: 'Round 1 answer 1' }]],
      Henry: [[{ answer: 'Round 1 answer 1', mark: 1 }]],
    };

    const quiz = new Quiz(
      'RANDOM_ID',
      "Ed's quiz",
      exampleRounds,
      new QuestionAsked(exampleRounds, answers, 0, 0),
      playerNames,
      answers
    );

    expect(quiz.players).toEqual([
      { name: 'Ed', status: PlayerStatus.ANSWERS_SUBMITTED },
      { name: 'Henry', status: PlayerStatus.MARKS_SUBMITTED },
    ]);
  });
});
