import React, { useContext } from 'react';
import { QuestionAsked as QuestionAskedState } from '../shared/graphql/types';
import { QuizContext } from '../shared/context/quizContext';
import { Question } from '../shared/domain/types';

export const QuestionAsked: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as QuestionAskedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <div>
      <h1>Round {round.roundNumber + 1}</h1>
      <h2>{round.roundName}</h2>
      <ul>
      {round.questions.map((question: Question) => (
        <li key={question.questionNumber}>
          <p>Question {question.questionNumber + 1}</p>
          <p>{question.questionText}</p>
          <p placeholder="Your answer" />
        </li>
      ))}
      </ul>
    </div>
  );
};
