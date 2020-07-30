import {
  QuizSummary,
  QuizStatus,
  RoundStarted,
  QuestionAsked,
  RoundFinished,
  QuizFinished,
} from '../graphql/types';

export type Quiz = Partial<QuizSummary> & {
  rounds: Round[];
};

interface Round {
  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;
  questions: Question[];
}

interface Question {
  questionNumber: number;
  questionText: string;
}

type NextQuizState =
  | RoundStarted
  | QuestionAsked
  | RoundFinished
  | QuizFinished;

export type QuizAction =
  | JoinedQuiz
  | QuizSummaryReceived
  | NextQuizStateReceived;

type JoinedQuiz = {
  type: 'JoinedQuiz';
  payload: {
    quizId: string;
  };
};

type QuizSummaryReceived = {
  type: 'QuizSummaryReceived';
  payload: QuizSummary;
};

type NextQuizStateReceived = {
  type: 'NextQuizStateReceived';
  payload: NextQuizState;
};

export const quizReducer = (
  quiz: Quiz = { rounds: [] },
  action: QuizAction,
): Quiz => {
  if (action.type === 'JoinedQuiz' || action.type === 'QuizSummaryReceived') {
    return {
      ...quiz,
      ...action.payload,
    };
  }

  if (action.type === 'NextQuizStateReceived') {
    switch (action.payload.status) {
      case QuizStatus.RoundStarted: {
        const state = action.payload as RoundStarted;

        const rounds = [...quiz.rounds];
        rounds[state.roundNumber] = {
          roundNumber: state.roundNumber,
          roundName: state.roundName,
          numberOfQuestions: state.numberOfQuestions,
          questions: [],
        };

        return {
          ...quiz,
          state,
          rounds,
        };
      }

      case QuizStatus.QuestionAsked: {
        const state = action.payload as QuestionAsked;

        return {
          ...quiz,
          state,
          rounds: quiz.rounds.map((round, index) => {
            if (index !== state.roundNumber) {
              return round;
            }

            const questions = [...round.questions];
            questions[state.questionNumber] = {
              questionNumber: state.questionNumber,
              questionText: state.questionText,
            };

            return {
              ...round,
              questions,
            };
          }),
        };
      }

      default:
        return { ...quiz, state: action.payload };
    }
  }

  return quiz;
};
