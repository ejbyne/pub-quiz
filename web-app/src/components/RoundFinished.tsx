import React, { useContext } from 'react';
import { QuizContext } from '../shared/context/quizContext';
import { RoundFinished as RoundFinishedState } from '../shared/graphql/types';

export const RoundFinished: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as RoundFinishedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <div>
      <h1>Round {round.roundNumber + 1} complete</h1>
    </div>
  );
};
