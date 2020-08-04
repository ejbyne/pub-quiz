import {
  QuizSummary,
  QuizStatus,
  RoundStarted,
  QuestionAsked,
  RoundFinished,
  QuizFinished,
  RoundSummary,
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
  if (action.type === 'JoinedQuiz') {
    return {
      ...quiz,
      ...action.payload,
    };
  }

  if (action.type === 'QuizSummaryReceived') {
    switch (action.payload.state.status) {
      case QuizStatus.RoundStarted:
      case QuizStatus.RoundFinished: {
        const state = action.payload.state as RoundStarted | RoundFinished;

        return {
          ...quiz,
          ...action.payload,
          rounds: addNewRound(quiz.rounds, state.roundSummary),
        };
      }

      case QuizStatus.QuestionAsked: {
        const state = action.payload.state as QuestionAsked;

        const questions = addNewQuestion(
          [],
          state.questionNumber,
          state.questionText,
        );

        return {
          ...quiz,
          ...action.payload,
          rounds: addNewRound(quiz.rounds, state.roundSummary, questions),
        };
      }

      default:
        return {
          ...quiz,
          ...action.payload,
        };
    }
  }

  if (action.type === 'NextQuizStateReceived') {
    switch (action.payload.status) {
      case QuizStatus.RoundStarted: {
        const state = action.payload as RoundStarted;

        return {
          ...quiz,
          state,
          rounds: addNewRound(quiz.rounds, state.roundSummary),
        };
      }

      case QuizStatus.QuestionAsked: {
        const state = action.payload as QuestionAsked;

        return {
          ...quiz,
          state,
          rounds: quiz.rounds.map((round, index) => {
            if (index !== state.roundSummary.roundNumber) {
              return round;
            }

            const questions = addNewQuestion(
              round.questions,
              state.questionNumber,
              state.questionText,
            );

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

const addNewRound = (
  rounds: Round[],
  newRoundSummary: RoundSummary,
  questions?: Question[] = [],
): Round[] => {
  const updatedRounds = [...rounds];

  updatedRounds[newRoundSummary.roundNumber] = {
    ...newRoundSummary,
    questions,
  };

  return updatedRounds;
};

const addNewQuestion = (
  questions: Question[],
  questionNumber: number,
  questionText: string,
): Question[] => {
  const updatedQuestions = [...questions];

  updatedQuestions[questionNumber] = {
    questionNumber,
    questionText,
  };

  return updatedQuestions;
};
