import {
  AnswersByPlayerName,
  Player,
  PlayerStatus,
  QuizState,
  Round,
} from './types';

export class Quiz {
  quizId: string;
  quizName: string;
  rounds: Round[];
  state: QuizState;
  playerNames?: string[];
  answers: AnswersByPlayerName;

  constructor(
    quizId: string,
    quizName: string,
    rounds: Round[],
    state: QuizState,
    playerNames?: string[],
    answers?: AnswersByPlayerName
  ) {
    this.quizId = quizId;
    this.quizName = quizName;
    this.rounds = rounds;
    this.state = state;
    this.playerNames = playerNames;
    this.answers = answers ?? {};
  }

  get nextState(): QuizState {
    return this.state.nextState();
  }

  get players(): Player[] | undefined {
    return this.playerNames?.map((name) => {
      if (this.hasPlayerSubmittedMarks(name)) {
        return {
          name,
          status: PlayerStatus.MARKS_SUBMITTED,
        };
      }
      if (this.hasPlayerSubmittedAnswers(name)) {
        return {
          name,
          status: PlayerStatus.ANSWERS_SUBMITTED,
        };
      }
      return {
        name,
        status: PlayerStatus.PLAYING,
      };
    });
  }

  private hasPlayerSubmittedAnswers(playerName: string): boolean {
    return !(
      this.state.roundNumber === undefined ||
      !this.answers[playerName]?.[this.state.roundNumber]
    );
  }

  private hasPlayerSubmittedMarks(playerName: string): boolean {
    if (
      this.state.roundNumber === undefined ||
      !this.answers[playerName]?.[this.state.roundNumber]
    ) {
      return false;
    }
    return this.answers[playerName][this.state.roundNumber].some(
      (answer) => answer?.mark !== undefined
    );
  }
}
