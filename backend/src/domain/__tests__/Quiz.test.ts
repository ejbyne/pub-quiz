import { Quiz } from '../Quiz';
import { QuizNotYetStartedState } from '../state/QuizNotYetStartedState';
import { RoundStartedState } from '../state/RoundStartedState';
import { QuestionAskedState } from '../state/QuestionAskedState';
import { RoundFinishedState } from '../state/RoundFinishedState';
import { QuestionAnsweredState } from '../state/QuestionAnsweredState';
import { exampleRounds } from '../../testSupport/testFixtures';
import { QuizStatus } from '../types';

const EXAMPLE_QUIZ_ID = 'NEW_QUIZ_ID';

describe('Quiz', () => {
  describe('nextState', () => {
    it('should start the first round if the quiz has not yet started', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuizNotYetStartedState(exampleRounds)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.ROUND_STARTED,
        roundNumber: 0,
      });
    });

    it('should return the first question if the round has started', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new RoundStartedState(exampleRounds, 0)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ASKED,
        roundNumber: 0,
        questionNumber: 0,
      });
    });

    it('should return the second question if the first question has been asked', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAskedState(exampleRounds, 0, 0)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ASKED,
        roundNumber: 0,
        questionNumber: 1,
      });
    });

    it('should finish the round if the there are no more questions', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAskedState(exampleRounds, 0, 1)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.ROUND_FINISHED,
        roundNumber: 0,
      });
    });

    it('should return the first answer if the round has finished', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new RoundFinishedState(exampleRounds, 0)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ANSWERED,
        roundNumber: 0,
        questionNumber: 0,
      });
    });

    it('should return the second answer if the first question has been answered', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAnsweredState(exampleRounds, 0, 0)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ANSWERED,
        roundNumber: 0,
        questionNumber: 1,
      });
    });

    it('should move to the second round if all of the questions have been answered', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAnsweredState(exampleRounds, 0, 1)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.ROUND_STARTED,
        roundNumber: 1,
      });
    });

    it('should finish the quiz at the end of the last round', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAnsweredState(exampleRounds, 1, 0)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUIZ_FINISHED,
      });
    });

    it('should finish the game if there are no rounds at all', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        [],
        new QuizNotYetStartedState([])
      );

      expect(quiz.nextState).toMatchObject({
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

      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        roundsWithNoQuestionsInFirstRound,
        new QuizNotYetStartedState(roundsWithNoQuestionsInFirstRound)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.ROUND_STARTED,
        roundNumber: 1,
      });
    });

    it('should skip the second round if there are no questions', () => {
      const roundsWithNoQuestionsInSecondRound = [
        {
          roundName: 'Round 1',
          questions: [
            {
              question: 'Question 1',
              answer: 'Answer 1',
            },
            {
              question: 'Question 2',
              answer: 'Answer 2',
            },
          ],
        },
        {
          roundName: 'Round 2',
          questions: [],
        },
      ];

      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        roundsWithNoQuestionsInSecondRound,
        new QuestionAnsweredState(roundsWithNoQuestionsInSecondRound, 0, 1)
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUIZ_FINISHED,
      });
    });
  });
});
