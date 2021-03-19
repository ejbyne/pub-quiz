import { Question, Quiz, QuizAction, Round } from './quizTypes';
import {
  PlayerJoined,
  PlayerStatus,
  PlayerSubmittedAnswers,
  PlayerSubmittedMarks,
  QuestionAnswered,
  QuestionAsked,
  QuizStatus,
  RoundFinished,
  RoundStarted,
  RoundSummary,
} from '../graphql/types';

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

      case QuizStatus.QuestionAsked:
      case QuizStatus.QuestionAnswered: {
        const state = action.payload.state as QuestionAsked | QuestionAnswered;

        return {
          ...quiz,
          ...action.payload,
          rounds: addNewRound(
            quiz.rounds,
            state.roundSummary,
            action.payload.currentRound ?? [],
          ),
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
          players: quiz.players?.map((player) => ({
            ...player,
            status: PlayerStatus.Playing,
          })),
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

            const questions = addNewQuestion(round.questions, state.question);

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

  if (action.type === 'PlayerJoined') {
    const playerJoined = action.payload as PlayerJoined;

    if (
      quiz.players?.some((player) => player.name === playerJoined.playerName)
    ) {
      return quiz;
    }

    return {
      ...quiz,
      players: [
        ...(quiz.players ?? []),
        {
          name: playerJoined.playerName,
          status: PlayerStatus.Playing,
        },
      ],
    };
  }

  if (action.type === 'PlayerSubmittedAnswers') {
    const playerSubmittedAnswers = action.payload as PlayerSubmittedAnswers;

    return {
      ...quiz,
      players: quiz.players?.map((player) =>
        player.name === playerSubmittedAnswers.playerName
          ? {
              ...player,
              status: PlayerStatus.AnswersSubmitted,
            }
          : player,
      ),
    };
  }

  if (action.type === 'PlayerSubmittedMarks') {
    const playerSubmittedMarks = action.payload as PlayerSubmittedMarks;

    return {
      ...quiz,
      players: quiz.players?.map((player) =>
        player.name === playerSubmittedMarks.playerName
          ? {
              ...player,
              status: PlayerStatus.MarksSubmitted,
            }
          : player,
      ),
    };
  }

  return quiz;
};

const addNewRound = (
  rounds: Round[],
  newRoundSummary: RoundSummary,
  questions: Question[] = [],
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

  updatedQuestions[question?.number] = question;

  return updatedQuestions;
};
