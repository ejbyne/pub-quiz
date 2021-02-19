export interface AnswerSheet {
  playerName?: string;
  rounds: {
    answer: string;
  }[][];
}

export type AnswerSheetAction = AnswerChanged | PlayerJoined;

interface PlayerJoined {
  type: 'PlayerJoined';
  payload: {
    playerName: string;
  }
}

interface AnswerChanged {
  type: 'AnswerChanged';
  payload: {
    roundNumber: number;
    questionNumber: number;
    answer: string;
  }
}
