import { NewQuizAction } from './newQuizTypes';
import { SaveQuizInput } from '../graphql/types';

export const emptyQuiz = {
  quizName: '',
  rounds: [
    {
      roundName: '',
      questions: [
        {
          text: '',
          answer: '',
        },
      ],
    },
  ],
};

export const newQuizReducer = (
  quiz: SaveQuizInput = emptyQuiz,
  action: NewQuizAction,
): SaveQuizInput => {
  switch (action.type) {
    case 'QuizNameAmended': {
      return {
        ...quiz,
        quizName: action.payload.quizName,
      };
    }

    case 'RoundAdded':
      return {
        ...quiz,
        rounds: [
          ...quiz.rounds,
          {
            roundName: '',
            questions: [
              {
                text: '',
                answer: '',
              },
            ],
          },
        ],
      };

    case 'RoundRemoved':
      return {
        ...quiz,
        rounds: quiz.rounds.filter(
          (_, index) => action.payload.roundNumber !== index,
        ),
      };

    case 'RoundNameAmended': {
      const rounds = [...quiz.rounds];
      const { roundNumber, roundName } = action.payload;
      rounds[roundNumber] = {
        ...rounds[roundNumber],
        roundName,
      };
      return {
        ...quiz,
        rounds,
      };
    }

    case 'QuestionAdded': {
      const { roundNumber } = action.payload;
      return {
        ...quiz,
        rounds: quiz.rounds.map((round, index) => {
          if (roundNumber !== index) {
            return round;
          }
          return {
            ...round,
            questions: [
              ...round.questions,
              {
                text: '',
                answer: '',
              },
            ],
          };
        }),
      };
    }

    case 'QuestionRemoved': {
      const { roundNumber, questionNumber } = action.payload;
      return {
        ...quiz,
        rounds: quiz.rounds.map((round, index) => {
          if (roundNumber !== index) {
            return round;
          }
          return {
            ...round,
            questions: round.questions.filter(
              (_, index) => questionNumber !== index,
            ),
          };
        }),
      };
    }

    case 'QuestionAmended': {
      const { roundNumber, questionNumber, text, answer } = action.payload;
      return {
        ...quiz,
        rounds: quiz.rounds.map((round, index) => {
          if (roundNumber !== index) {
            return round;
          }
          const updatedQuestions = [...round.questions];
          updatedQuestions[questionNumber] = {
            text,
            answer,
          };
          return {
            ...round,
            questions: updatedQuestions,
          };
        }),
      };
    }

    default:
      return quiz;
  }
};
