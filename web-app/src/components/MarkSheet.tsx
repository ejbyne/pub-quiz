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
    <section className="w-full lg:w-1/2 px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200">
      <h1 className="text-2xl text-center mb-4">
        {state.status === QuizStatus.RoundMarked
          ? `Round ${(state as RoundMarked).roundSummary.roundNumber + 1}`
          : 'Quiz complete'}
      </h1>
      {state.marks && (
        <>
          <h2 className="text-xl text-center mb-4">Marks</h2>
          <div className="w-full overflow-x-auto">
            <table className="text-left table-fixed">
              <thead>
                <tr>
                  <th className="w-24 px-1 align-top">Player</th>
                  <th className="w-24 px-1 align-top">Total</th>
                  {state.marks[0]?.rounds.map((_, index) => (
                    <th className="w-24 px-1 align-top">Round {index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.marks.map((playerMarks) => (
                  <tr>
                    <td className="px-1 align-top">{playerMarks.playerName}</td>
                    <td className="px-1 align-top">{playerMarks.quizTotal}</td>
                    {playerMarks.rounds.map((round) => (
                      <td className="px-1 align-top">{round.roundTotal}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};
