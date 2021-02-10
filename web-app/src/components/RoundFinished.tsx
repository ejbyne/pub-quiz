import React, { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { RoundFinished as RoundFinishedState } from '@pub-quiz/shared/src/graphql/types';

export const RoundFinished: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as RoundFinishedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <section className="w-full lg:w-1/2 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <h1 className="text-2xl text-center m-4">
        Round {round.roundNumber + 1} completed
      </h1>
    </section>
  );
};
