import {
  QuizState,
  Round,
  QuizStatus,
  QuizFinishedState,
  RoundStartedState,
  QuestionAskedState,
} from './types';

export class Quiz {
  quizId: string;
  quizName: string;
  rounds: Round[];
  state: QuizState;
  playerNames?: string[];

  constructor(
    quizId: string,
    quizName: string,
    rounds: Round[],
    state: QuizState,
    playerNames?: string[]
  ) {
    this.quizId = quizId;
    this.quizName = quizName;
    this.rounds = rounds;
    this.state = state;
    this.playerNames = playerNames;
  }

  get nextState(): QuizState {
    switch (this.state.status) {
      case QuizStatus.QUIZ_NOT_YET_STARTED: {
        const nextRoundWithQuestions = this.rounds.findIndex(
          (round) => round.questions.length > 0
        );

        if (nextRoundWithQuestions === -1) {
          return new QuizFinishedState();
        }

        return new RoundStartedState(
          nextRoundWithQuestions,
          this.rounds[nextRoundWithQuestions].roundName,
          this.rounds[nextRoundWithQuestions].questions.length
        );
      }

      case QuizStatus.ROUND_STARTED:
        return new QuestionAskedState(
          this.state.roundNumber,
          0,
          this.rounds[this.state.roundNumber].questions[0].question
        );

      case QuizStatus.QUESTION_ASKED:
        if (
          this.state.questionNumber ===
          this.rounds[this.state.roundNumber].questions.length - 1
        ) {
          const roundNumber = this.state.roundNumber;
          const nextRoundWithQuestions = this.rounds.findIndex(
            (round, index) => index > roundNumber && round.questions.length > 0
          );

          if (nextRoundWithQuestions === -1) {
            return new QuizFinishedState();
          }

          return new RoundStartedState(
            nextRoundWithQuestions,
            this.rounds[nextRoundWithQuestions].roundName,
            this.rounds[nextRoundWithQuestions].questions.length
          );
        }

        return new QuestionAskedState(
          this.state.roundNumber,
          this.state.questionNumber + 1,
          this.rounds[this.state.roundNumber].questions[
            this.state.questionNumber + 1
          ].question
        );

      default:
        return this.state;
    }
  }
}
