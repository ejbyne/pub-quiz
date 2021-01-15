import React, { useContext } from 'react';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { RoundStarted as RoundStartedState } from '@pub-quiz/shared/src/graphql/types';

export const RoundStarted: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as RoundStartedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <div>
      <h1>Round {round.roundNumber + 1}</h1>
      <h2>{round.roundName}</h2>
      <h3>{round.numberOfQuestions} questions</h3>
    </div>
  );
};
