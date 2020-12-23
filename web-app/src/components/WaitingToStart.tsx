import React, { useContext } from 'react';
import { QuizContext } from '../shared/context/quizContext';

export const WaitingToStart: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);

  return (
    <div>
      <h1>You have joined the quiz: {quiz.quizName}</h1>
    </div>
  );
};
