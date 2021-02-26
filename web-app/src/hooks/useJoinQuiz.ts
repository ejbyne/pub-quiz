import { getQuizHistory, saveQuizRecord } from '../localStorage/quizHistory';
import { useJoinQuizMutation } from '@pub-quiz/shared/src/graphql/types';

export const useJoinQuiz = (
  quizId: string,
  playerName: string,
): [
  joinQuiz: VoidFunction,
  joinQuizError?: string,
  joinQuizCalled?: boolean,
] => {
  const [joinQuiz, { error, called }] = useJoinQuizMutation();
  const joinQuizError = error?.graphQLErrors?.[0]?.message;

  const handleJoinQuiz = async () => {
    const quizHistory = getQuizHistory();

    if (!hasPlayerAlreadyJoined(quizHistory, quizId, playerName)) {
      try {
        await joinQuiz({
          variables: {
            input: {
              quizId,
              playerName,
            },
          },
        });

        saveQuizRecord(quizId, playerName);
      } catch (error) {
        // Do nothing: we display error message
      }
    }
  };

  return [handleJoinQuiz, joinQuizError, called];
};

const hasPlayerAlreadyJoined = (
  quizHistory: { quizId: string; playerName: string }[],
  quizId: string,
  playerName: string,
) =>
  quizHistory.some(
    (quiz: { quizId: string; playerName: string }) =>
      quiz.quizId === quizId && quiz.playerName === playerName,
  );
