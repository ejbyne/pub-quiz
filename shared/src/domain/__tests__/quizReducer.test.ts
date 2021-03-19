import { quizReducer } from '../quizReducer';
import { QuizStatus, QuizState, PlayerStatus } from '../../graphql/types';

const exampleQuiz = {
  quizId: 'RANDOM_ID',
  quizName: 'Random Quiz',
  playerNames: null,
  players: null,
  state: {
    __typename: 'QuizNotYetStarted',
    quizId: 'RANDOM_ID',
    status: QuizStatus.QuizNotYetStarted,
  },
};

describe('quiz reducer', () => {
  describe('JoinedQuiz', () => {
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
  });

  describe('QuizSummaryReceived', () => {
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
          currentRound: [
            { number: 0, text: 'The first question' },
            { number: 1, text: 'The second question' },
            { number: 2, text: 'The third question' },
          ],
          state: {
            quizId: 'RANDOM_ID',
            status: QuizStatus.QuestionAsked,
            roundSummary: {
              roundNumber: 0,
              roundName: 'Round 1',
              numberOfQuestions: 3,
            },
            question: {
              number: 2,
              text: 'The third question',
            },
          } as QuizState,
        },
      });

      expect(result.rounds).toEqual([
        {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 3,
          questions: [
            { number: 0, text: 'The first question' },
            { number: 1, text: 'The second question' },
            { number: 2, text: 'The third question' },
          ],
        },
      ]);
    });

    it('should store round and question information for a player who joins during the answers', () => {
      const quiz = { rounds: [] };

      const result = quizReducer(quiz, {
        type: 'QuizSummaryReceived',
        payload: {
          quizId: 'RANDOM_ID',
          quizName: 'A quiz',
          currentRound: [
            {
              number: 0,
              text: 'The first question',
              answer: 'The first answer',
            },
            {
              number: 1,
              text: 'The second question',
              answer: 'The second answer',
            },
            { number: 2, text: 'The third question' },
          ],
          state: {
            quizId: 'RANDOM_ID',
            status: QuizStatus.QuestionAnswered,
            roundSummary: {
              roundNumber: 0,
              roundName: 'Round 1',
              numberOfQuestions: 3,
            },
            question: {
              number: 1,
              text: 'The second question',
              answer: 'The second answer',
            },
          } as QuizState,
        },
      });

      expect(result.rounds).toEqual([
        {
          roundNumber: 0,
          roundName: 'Round 1',
          numberOfQuestions: 3,
          questions: [
            {
              number: 0,
              text: 'The first question',
              answer: 'The first answer',
            },
            {
              number: 1,
              text: 'The second question',
              answer: 'The second answer',
            },
            { number: 2, text: 'The third question' },
          ],
        },
      ]);
    });
  });

  describe('NextQuizStateReceived', () => {
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
          question: {
            number: 0,
            text: 'The first question',
          },
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
          question: {
            number: 1,
            text: 'The second question',
          },
        },
      });

      expect(resultAfterSecondQuestion.rounds).toEqual([
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
          questions: [
            {
              number: 0,
              text: 'The first question',
            },
            {
              number: 1,
              text: 'The second question',
            },
          ],
        },
      ]);
    });

    it('should remember answers', () => {
      const quiz = {
        ...exampleQuiz,
        state: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.RoundFinished,
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
            questions: [
              {
                number: 0,
                text: 'The first question',
              },
              {
                number: 1,
                text: 'The second question',
              },
            ],
          },
        ],
      };

      const resultAfterFirstQuestion = quizReducer(quiz, {
        type: 'NextQuizStateReceived',
        payload: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.QuestionAnswered,
          roundSummary: {
            roundNumber: 0,
            roundName: 'The first round',
            numberOfQuestions: 10,
          },
          question: {
            number: 0,
            text: 'The first question',
            answer: 'The first answer',
          },
        },
      });

      const resultAfterSecondQuestion = quizReducer(resultAfterFirstQuestion, {
        type: 'NextQuizStateReceived',
        payload: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.QuestionAnswered,
          roundSummary: {
            roundNumber: 0,
            roundName: 'The first round',
            numberOfQuestions: 10,
          },
          question: {
            number: 1,
            text: 'The second question',
            answer: 'The second answer',
          },
        },
      });

      expect(resultAfterSecondQuestion.rounds).toEqual([
        {
          roundNumber: 0,
          roundName: 'The first round',
          numberOfQuestions: 10,
          questions: [
            {
              number: 0,
              text: 'The first question',
              answer: 'The first answer',
            },
            {
              number: 1,
              text: 'The second question',
              answer: 'The second answer',
            },
          ],
        },
      ]);
    });

    it('resets player statuses when a new round starts', () => {
      const quiz = {
        ...exampleQuiz,
        players: [
          {
            name: 'Ed',
            status: PlayerStatus.MarksSubmitted,
          },
          {
            name: 'Henry',
            status: PlayerStatus.AnswersSubmitted,
          },
        ],
        state: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.RoundMarked,
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
        marks: [],
      };

      const result = quizReducer(quiz, {
        type: 'NextQuizStateReceived',
        payload: {
          quizId: 'RANDOM_ID',
          status: QuizStatus.RoundStarted,
          roundSummary: {
            roundNumber: 1,
            roundName: 'The second round',
            numberOfQuestions: 10,
          },
        },
      });

      expect(result.players).toEqual([
        {
          name: 'Ed',
          status: PlayerStatus.Playing,
        },
        {
          name: 'Henry',
          status: PlayerStatus.Playing,
        },
      ]);
    });
  });

  describe('PlayerJoined', () => {
    it('adds the first player', () => {
      const quiz = {
        ...exampleQuiz,
        rounds: [],
      };

      const result = quizReducer(quiz, {
        type: 'PlayerJoined',
        payload: {
          quizId: 'RANDOM_ID',
          playerName: 'Ed',
        },
      });

      expect(result.players).toEqual([
        {
          name: 'Ed',
          status: PlayerStatus.Playing,
        },
      ]);
    });

    it('adds the second player', () => {
      const quiz = {
        ...exampleQuiz,
        players: [
          {
            name: 'Ed',
            status: PlayerStatus.Playing,
          },
        ],
        rounds: [],
      };

      const result = quizReducer(quiz, {
        type: 'PlayerJoined',
        payload: {
          quizId: 'RANDOM_ID',
          playerName: 'Henry',
        },
      });

      expect(result.players).toEqual([
        {
          name: 'Ed',
          status: PlayerStatus.Playing,
        },
        {
          name: 'Henry',
          status: PlayerStatus.Playing,
        },
      ]);
    });

    it('ignores players who already exist', () => {
      const quiz = {
        ...exampleQuiz,
        players: [
          {
            name: 'Ed',
            status: PlayerStatus.Playing,
          },
        ],
        rounds: [],
      };

      const result = quizReducer(quiz, {
        type: 'PlayerJoined',
        payload: {
          quizId: 'RANDOM_ID',
          playerName: 'Ed',
        },
      });

      expect(result.players).toEqual([
        {
          name: 'Ed',
          status: PlayerStatus.Playing,
        },
      ]);
    });
  });

  describe('PlayerSubmittedAnswers', () => {
    it("updates the player's status", () => {
      const quiz = {
        ...exampleQuiz,
        players: [
          {
            name: 'Ed',
            status: PlayerStatus.Playing,
          },
        ],
        rounds: [],
      };

      const result = quizReducer(quiz, {
        type: 'PlayerSubmittedAnswers',
        payload: {
          quizId: 'RANDOM_ID',
          playerName: 'Ed',
        },
      });

      expect(result.players).toEqual([
        {
          name: 'Ed',
          status: PlayerStatus.AnswersSubmitted,
        },
      ]);
    });
  });

  describe('PlayerSubmittedMarks', () => {
    it("updates the player's status", () => {
      const quiz = {
        ...exampleQuiz,
        players: [
          {
            name: 'Ed',
            status: PlayerStatus.AnswersSubmitted,
          },
          {
            name: 'Henry',
            status: PlayerStatus.AnswersSubmitted,
          },
        ],
        rounds: [],
      };

      const result = quizReducer(quiz, {
        type: 'PlayerSubmittedMarks',
        payload: {
          quizId: 'RANDOM_ID',
          playerName: 'Ed',
        },
      });

      expect(result.players).toEqual([
        {
          name: 'Ed',
          status: PlayerStatus.MarksSubmitted,
        },
        {
          name: 'Henry',
          status: PlayerStatus.AnswersSubmitted,
        },
      ]);
    });
  });
});
