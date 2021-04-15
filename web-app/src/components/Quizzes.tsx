import { useQuizzesQuery } from '@pub-quiz/shared/src/graphql/types';

export const Quizzes = () => {
  const { data } = useQuizzesQuery();
  if (!data) {
    return null;
  }

  return (
    <div className="grid grid-cols-1">
      {data.quizzes.map((quiz) => (
        <div key={quiz.quizId}>{quiz.quizName}</div>
      ))}
    </div>
  );
};
