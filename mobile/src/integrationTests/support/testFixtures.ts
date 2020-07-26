import { QuizStatus } from "../../graphql/types";

export const exampleQuiz = {
  quizId: 'RANDOM_ID',
  quizName: 'Random Quiz',
  playerNames: null,
  rounds: [],
  state: {
    __typename: 'QuizNotYetStarted',
    quizId: 'RANDOM_ID',
    status: QuizStatus.QuizNotYetStarted,
  },
};
