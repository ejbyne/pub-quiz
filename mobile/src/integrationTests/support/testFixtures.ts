import { QuizStatus } from '../../../../web-app/src/shared/graphql/types';

export const exampleQuiz = {
  quizId: 'RANDOM_ID',
  quizName: 'Random Quiz',
  playerNames: null,
  state: {
    __typename: 'QuizNotYetStarted',
    quizId: 'RANDOM_ID',
    status: QuizStatus.QuizNotYetStarted,
  },
};
