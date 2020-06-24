import { QuizState, Round, QuizStatus } from './types';

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
          return {
            status: QuizStatus.QUIZ_FINISHED,
          };
        }

        return {
          status: QuizStatus.ROUND_STARTED,
          roundNumber: nextRoundWithQuestions,
          roundName: this.rounds[nextRoundWithQuestions].roundName,
          numberOfQuestions: this.rounds[nextRoundWithQuestions].questions
            .length,
        };
      }

      case QuizStatus.ROUND_STARTED:
        return {
          status: QuizStatus.QUESTION_ASKED,
          roundNumber: this.state.roundNumber,
          questionNumber: 0,
          questionText: this.rounds[this.state.roundNumber].questions[0]
            .question,
        };

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
            return {
              status: QuizStatus.QUIZ_FINISHED,
            };
          }

          return {
            status: QuizStatus.ROUND_STARTED,
            roundNumber: nextRoundWithQuestions,
            roundName: this.rounds[nextRoundWithQuestions].roundName,
            numberOfQuestions: this.rounds[nextRoundWithQuestions].questions
              .length,
          };
        }

        return {
          status: QuizStatus.QUESTION_ASKED,
          roundNumber: this.state.roundNumber,
          questionNumber: this.state.questionNumber + 1,
          questionText: this.rounds[this.state.roundNumber].questions[
            this.state.questionNumber + 1
          ].question,
        };

      default:
        return this.state;
    }
  }
}
