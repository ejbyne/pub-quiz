import { quizReducer } from '../quizReducer';
import { QuizStatus, QuizState } from '../../graphql/types';

const exampleQuiz = {
  quizId: 'RANDOM_ID',
  quizName: 'Random Quiz',
  playerNames: null,
  state: {
    __typename: 'QuizNotYetStarted',
    quizId: 'RANDOM_ID',
    status: QuizStatus.QuizNotYetStarted,
  },
};

describe('quiz reducer', () => {
  it('should store the quiz id', () => {
    const quiz = { rounds: [] };

    const result = quizReducer(quiz, {
      type: 'JoinedQuiz',
      payload: {
        quizId: 'RANDOM_ID',
      },
    });

    expect(result.quizId).toEqual('RANDOM_ID');
  });

  it('should store the quiz summary', () => {
    const quiz = { rounds: [] };

    const result = quizReducer(quiz, {
      type: 'QuizSummaryReceived',
      payload: {
        quizId: 'RANDOM_ID',
        quizName: 'A quiz',
        state: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.QuizNotYetStarted,
        },
      },
    });

    expect(result).toMatchObject({
      quizId: 'RANDOM_ID',
      quizName: 'A quiz',
      state: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.QuizNotYetStarted,
      },
      rounds: [],
    });
  });

  it('should remember the round information', () => {
    const quiz = {
      ...exampleQuiz,
      rounds: [],
    };

    const resultAfterFirstRound = quizReducer(quiz, {
      type: 'NextQuizStateReceived',
      payload: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.RoundStarted,
        roundSummary: {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
        },
      },
    });

    const resultAfterSecondRound = quizReducer(resultAfterFirstRound, {
      type: 'NextQuizStateReceived',
      payload: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.RoundStarted,
        roundSummary: {
          roundNumber: 1,
          roundName: 'The second round',
          numberOfQuestions: 8,
        },
      },
    });

    expect(resultAfterSecondRound.rounds).toEqual([
      {
        roundNumber: 0,
        roundName: 'The first round',
        numberOfQuestions: 10,
        questions: [],
      },
      {
        roundNumber: 1,
        roundName: 'The second round',
        numberOfQuestions: 8,
        questions: [],
      },
    ]);
  });

  it('should remember questions', () => {
    const quiz = {
      ...exampleQuiz,
      state: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.RoundStarted,
        roundSummary: {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
        },
      } as QuizState,
      rounds: [
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
          questions: [],
        },
      ],
    };

    const resultAfterFirstQuestion = quizReducer(quiz, {
      type: 'NextQuizStateReceived',
      payload: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.QuestionAsked,
        roundSummary: {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
        },
        questionNumber: 0,
        questionText: 'The first question',
      },
    });

    const resultAfterSecondQuestion = quizReducer(resultAfterFirstQuestion, {
      type: 'NextQuizStateReceived',
      payload: {
        quizId: 'RANDOM_ID',
        status: QuizStatus.QuestionAsked,
        roundSummary: {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
        },
        questionNumber: 1,
        questionText: 'The second question',
      },
    });

    expect(resultAfterSecondQuestion.rounds).toEqual([
      {
        roundNumber: 0,
        roundName: 'The first round',
        numberOfQuestions: 10,
        questions: [
          {
            questionNumber: 0,
            questionText: 'The first question',
          },
          {
            questionNumber: 1,
            questionText: 'The second question',
          },
        ],
      },
    ]);
  });

  it('should store round for a player who joins at the start of the round', () => {
    const quiz = { rounds: [] };

    const result = quizReducer(quiz, {
      type: 'QuizSummaryReceived',
      payload: {
        quizId: 'RANDOM_ID',
        quizName: 'A quiz',
        state: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.RoundStarted,
          roundSummary: {
            roundNumber: 0,
            roundName: 'Round 1',
            numberOfQuestions: 10,
          },
        } as QuizState,
      },
    });

    expect(result.rounds).toEqual([
      {
        roundNumber: 0,
        roundName: 'Round 1',
        numberOfQuestions: 10,
        questions: [],
      },
    ]);
  });

  it('should store round and question information for a player who joins during the questions', () => {
    const quiz = { rounds: [] };

    const result = quizReducer(quiz, {
      type: 'QuizSummaryReceived',
      payload: {
        quizId: 'RANDOM_ID',
        quizName: 'A quiz',
        state: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.QuestionAsked,
          roundSummary: {
            roundNumber: 0,
            roundName: 'Round 1',
            numberOfQuestions: 10,
          },
          questionNumber: 3,
          questionText: 'Question 4',
        } as QuizState,
      },
    });

    expect(result.rounds).toEqual([
      {
        roundNumber: 0,
        roundName: 'Round 1',
        numberOfQuestions: 10,
        questions: [
          undefined,
          undefined,
          undefined,
          {
            questionNumber: 3,
            questionText: 'Question 4',
          },
        ],
      },
    ]);
  });
});
