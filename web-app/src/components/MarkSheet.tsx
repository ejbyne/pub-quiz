import React, { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import {
  QuizFinished,
  QuizStatus,
  RoundMarked,
} from '@pub-quiz/shared/src/graphql/types';

export const MarkSheet: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as RoundMarked | QuizFinished;

  return (
    <section className="w-full lg:w-1/2 px-6 py-6 flex flex-col items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
      <h1 className="text-2xl text-center mb-4">
        {state.status === QuizStatus.RoundMarked
          ? `Round ${(state as RoundMarked).roundSummary.roundNumber + 1}`
          : 'Quiz complete'}
      </h1>
      <h2 className="text-xl text-center mb-4">Marks</h2>
    </section>
  );
};
