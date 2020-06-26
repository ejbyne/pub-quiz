export interface Round {
  roundName: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
}

export enum QuizStatus {
  QUIZ_NOT_YET_STARTED = 'QUIZ_NOT_YET_STARTED',
  ROUND_STARTED = 'ROUND_STARTED',
  ROUND_FINISHED = 'ROUND_FINISHED',
  QUESTION_ASKED = 'QUESTION_ASKED',
  QUIZ_FINISHED = 'QUIZ_FINISHED',
}

export interface BaseQuizState {
  status: QuizStatus;
  rounds: Round[];
  nextState(): QuizState;
}

export type QuizState =
  | QuizNotYetStartedState
  | RoundStartedState
  | RoundFinishedState
  | QuestionAskedState
  | QuizFinishedState;

export class QuizNotYetStartedState implements BaseQuizState {
  status: QuizStatus.QUIZ_NOT_YET_STARTED = QuizStatus.QUIZ_NOT_YET_STARTED;
  rounds: Round[];

  constructor(rounds: Round[]) {
    this.rounds = rounds;
  }

  nextState(): QuizState {
    const nextRoundWithQuestions = this.rounds.findIndex(
      (round) => round.questions.length > 0
    );

    if (nextRoundWithQuestions === -1) {
      return new QuizFinishedState(this.rounds);
    }

    return new RoundStartedState(
      this.rounds,
      nextRoundWithQuestions,
      this.rounds[nextRoundWithQuestions].roundName,
      this.rounds[nextRoundWithQuestions].questions.length
    );
  }
}

export class RoundStartedState implements BaseQuizState {
  status: QuizStatus.ROUND_STARTED = QuizStatus.ROUND_STARTED;
  rounds: Round[];

  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;

  constructor(
    rounds: Round[],
    roundNumber: number,
    roundName: string,
    numberOfQuestions: number
  ) {
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.roundName = roundName;
    this.numberOfQuestions = numberOfQuestions;
  }

  nextState(): QuizState {
    return new QuestionAskedState(
      this.rounds,
      this.roundNumber,
      0,
      this.rounds[this.roundNumber].questions[0].question
    );
  }
}

export class QuestionAskedState implements BaseQuizState {
  status: QuizStatus.QUESTION_ASKED;
  rounds: Round[];

  roundNumber: number;
  questionNumber: number;
  questionText: string;

  constructor(
    rounds: Round[],
    roundNumber: number,
    questionNumber: number,
    questionText: string
  ) {
    this.status = QuizStatus.QUESTION_ASKED;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.questionNumber = questionNumber;
    this.questionText = questionText;
  }

  nextState(): QuizState {
    if (
      this.questionNumber ===
      this.rounds[this.roundNumber].questions.length - 1
    ) {
      return new RoundFinishedState(
        this.rounds,
        this.roundNumber,
        this.rounds[this.roundNumber].roundName,
        this.rounds[this.roundNumber].questions.length
      );
    }

    return new QuestionAskedState(
      this.rounds,
      this.roundNumber,
      this.questionNumber + 1,
      this.rounds[this.roundNumber].questions[this.questionNumber + 1].question
    );
  }
}

export class RoundFinishedState implements BaseQuizState {
  status: QuizStatus.ROUND_FINISHED;
  rounds: Round[];
  roundNumber: number;
  roundName: string;
  numberOfQuestions: number;

  constructor(
    rounds: Round[],
    roundNumber: number,
    roundName: string,
    numberOfQuestions: number
  ) {
    this.status = QuizStatus.ROUND_FINISHED;
    this.rounds = rounds;
    this.roundNumber = roundNumber;
    this.roundName = roundName;
    this.numberOfQuestions = numberOfQuestions;
  }

  nextState(): QuizState {
    const nextRoundWithQuestions = this.rounds.findIndex(
      (round, index) => index > this.roundNumber && round.questions.length > 0
    );

    if (nextRoundWithQuestions === -1) {
      return new QuizFinishedState(this.rounds);
    }

    return new RoundStartedState(
      this.rounds,
      nextRoundWithQuestions,
      this.rounds[nextRoundWithQuestions].roundName,
      this.rounds[nextRoundWithQuestions].questions.length
    );
  }
}

export class QuizFinishedState implements BaseQuizState {
  status: QuizStatus.QUIZ_FINISHED;
  rounds: Round[];

  constructor(rounds: Round[]) {
    this.status = QuizStatus.QUIZ_FINISHED;
    this.rounds = rounds;
  }

  nextState(): QuizState {
    return this;
  }
}
