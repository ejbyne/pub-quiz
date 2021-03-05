export interface AnswerSheet {
  playerName?: string;
  rounds: {
    answer?: string;
    mark?: number;
  }[][];
}

export type AnswerSheetAction = PlayerJoined | AnswerChanged | AnswerMarked;

interface PlayerJoined {
  type: 'PlayerJoined';
  payload: {
    playerName: string;
  };
}

interface AnswerChanged {
  type: 'AnswerChanged';
  payload: {
    roundNumber: number;
    questionNumber: number;
    answer: string;
  };
}

interface AnswerMarked {
  type: 'AnswerMarked';
  payload: {
    roundNumber: number;
    questionNumber: number;
    mark: number;
  };
}
