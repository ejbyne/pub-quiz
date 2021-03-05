import { AnswerSheet, AnswerSheetAction } from './answerSheetTypes';

export const answerSheetReducer = (
  answerSheet: AnswerSheet = { rounds: [] },
  action: AnswerSheetAction,
) => {
  switch (action.type) {
    case 'PlayerJoined':
      return {
        ...answerSheet,
        playerName: action.payload.playerName,
      };

    case 'AnswerChanged': {
      const { roundNumber, questionNumber, answer } = action.payload;
      const rounds = [...answerSheet.rounds];

      const roundToUpdate = [...(answerSheet.rounds[roundNumber] ?? [])];
      roundToUpdate[questionNumber] = { answer };
      rounds[roundNumber] = roundToUpdate;

      return { ...answerSheet, rounds: rounds };
    }

    case 'AnswerMarked': {
      const { roundNumber, questionNumber, mark } = action.payload;
      const rounds = [...answerSheet.rounds];

      const roundToUpdate = [...(answerSheet.rounds[roundNumber] ?? [])];
      roundToUpdate[questionNumber] = {
        ...roundToUpdate[questionNumber],
        mark,
      };
      rounds[roundNumber] = roundToUpdate;

      return { ...answerSheet, rounds: rounds };
    }

    default:
      return answerSheet;
  }
};
