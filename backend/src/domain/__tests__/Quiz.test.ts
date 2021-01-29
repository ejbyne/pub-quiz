import { Quiz } from '../Quiz';
import { QuizNotYetStartedState } from '../state/QuizNotYetStartedState';
import { QuizStatus } from '../state/QuizState';
import { RoundStartedState } from '../state/RoundStartedState';
import { QuestionAskedState } from '../state/QuestionAskedState';
import { RoundFinishedState } from '../state/RoundFinishedState';
import { QuestionAnsweredState } from '../state/QuestionAnsweredState';

const EXAMPLE_QUIZ_ID = 'NEW_QUIZ_ID';

describe('Quiz', () => {
  const exampleRounds = [
    {
      roundName: 'Round 1',
      questions: [
        {
          question: 'Question 1',
          answer: 'Answer 1',
          options: ['Answer 1', 'Answer 1b', 'Answer 1c'],
        },
        {
          question: 'Question 2',
          answer: 'Answer 2',
        },
      ],
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
        roundSummary: {
          roundName: 'Round 1',
          roundNumber: 0,
          numberOfQuestions: 2,
        },
      });
    });

    it('should return the first question if the round has started', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new RoundStartedState(exampleRounds, {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 2,
        })
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ASKED,
        roundSummary: {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 2,
        },
        questionNumber: 0,
        questionText: 'Question 1',
        questionOptions: ['Answer 1', 'Answer 1b', 'Answer 1c'],
      });
    });

    it('should return the second question if the first question has been asked', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAskedState(
          exampleRounds,
          {
            roundNumber: 0,
            roundName: 'Round 1',
            numberOfQuestions: 2,
          },
          0,
          'Question 1',
          ['Answer 1', 'Answer 1b', 'Answer 1c']
        )
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ASKED,
        roundSummary: {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 2,
        },
        questionNumber: 1,
        questionText: 'Question 2',
      });
    });

    it('should finish the round if the there are no more questions', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAskedState(
          exampleRounds,
          {
            roundNumber: 0,
            roundName: 'Round 1',
            numberOfQuestions: 2,
          },
          1,
          'Question 2'
        )
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.ROUND_FINISHED,
        roundSummary: {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 2,
        },
      });
    });

    it('should return the first answer if the round has finished', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new RoundFinishedState(exampleRounds, {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 2,
        })
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ANSWERED,
        roundSummary: {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 2,
        },
        questionText: 'Question 1',
        questionAnswer: 'Answer 1',
        questionOptions: ['Answer 1', 'Answer 1b', 'Answer 1c'],
      });
    });

    it('should return the second answer if the first question has been answered', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAnsweredState(
          exampleRounds,
          {
            roundNumber: 0,
            roundName: 'Round 1',
            numberOfQuestions: 2,
          },
          0,
          'Question 1',
          'Answer 1',
          ['Answer 1', 'Answer 1b', 'Answer 1c']
        )
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUESTION_ANSWERED,
        roundSummary: {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 2,
        },
        questionText: 'Question 2',
        questionAnswer: 'Answer 2',
      });
    });

    it('should move to the second round if all of the questions have been answered', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAnsweredState(
          exampleRounds,
          {
            roundNumber: 0,
            roundName: 'Round 1',
            numberOfQuestions: 2,
          },
          1,
          'Question 2',
          'Answer 2'
        )
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.ROUND_STARTED,
        roundSummary: {
          roundNumber: 1,
          roundName: 'Round 2',
          numberOfQuestions: 1,
        },
      });
    });

    it('should finish the quiz at the end of the last round', () => {
      const quiz = new Quiz(
        EXAMPLE_QUIZ_ID,
        "Ed's quiz",
        exampleRounds,
        new QuestionAnsweredState(
          exampleRounds,
          {
            roundNumber: 1,
            roundName: 'Round 2',
            numberOfQuestions: 1,
          },
          0,
          'Question 1',
          'Answer 1'
        )
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
        roundSummary: {
          roundNumber: 1,
          roundName: 'Round 2',
          numberOfQuestions: 1,
        },
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
        new QuestionAnsweredState(
          roundsWithNoQuestionsInSecondRound,
          {
            roundNumber: 0,
            roundName: 'Round 1',
            numberOfQuestions: 2,
          },
          1,
          'Question 2',
          'Answer 2'
        )
      );

      expect(quiz.nextState).toMatchObject({
        status: QuizStatus.QUIZ_FINISHED,
      });
    });
  });
});
