import { Quiz, QuizAction, Round, Question } from "./types";
import {
  QuizStatus,
  RoundStarted,
  RoundFinished,
  QuestionAsked,
  RoundSummary,
} from "../graphql/types";
import { QuestionAnswered } from "../graphql/types";

export const quizReducer = (
  quiz: Quiz = { rounds: [] },
  action: QuizAction
): Quiz => {
  if (action.type === "JoinedQuiz") {
    return {
      ...quiz,
      ...action.payload,
    };
  }

  if (action.type === "QuizSummaryReceived") {
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

      case QuizStatus.QuestionAsked:
      case QuizStatus.QuestionAnswered: {
        const state = action.payload.state as QuestionAsked | QuestionAnswered;

        const questions = addNewQuestion(
          [],
          state.question
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

  if (action.type === "NextQuizStateReceived") {
    switch (action.payload.status) {
      case QuizStatus.RoundStarted: {
        const state = action.payload as RoundStarted;

        return {
          ...quiz,
          state,
          rounds: addNewRound(quiz.rounds, state.roundSummary),
        };
      }

      case QuizStatus.QuestionAsked:
      case QuizStatus.QuestionAnswered: {
        const state = action.payload as QuestionAsked | QuestionAnswered;

        return {
          ...quiz,
          state,
          rounds: quiz.rounds.map((round, index) => {
            if (index !== state.roundSummary.roundNumber) {
              return round;
            }

            const questions = addNewQuestion(
              round.questions,
              state.question
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
  questions: Question[] = []
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
  question: Question,
): Question[] => {
  const updatedQuestions = [...questions];

  updatedQuestions[question.number] = question;

  return updatedQuestions;
};
