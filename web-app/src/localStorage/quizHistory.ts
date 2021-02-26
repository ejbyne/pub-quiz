export const getQuizHistory = (): { quizId: string; playerName: string }[] => {
  const serialisedQuizHistory = window.localStorage.getItem('quizHistory');
  return serialisedQuizHistory ? JSON.parse(serialisedQuizHistory) : [];
};

export const saveQuizRecord = (quizId: string, playerName: string): void => {
  const quizHistory = getQuizHistory();
  window.localStorage.setItem(
    'quizHistory',
    JSON.stringify([...quizHistory, { quizId, playerName }]),
  );
};
