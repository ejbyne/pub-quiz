import React, { useContext } from 'react';
import { QuestionAsked as QuestionAskedState } from '@pub-quiz/shared/src/graphql/types';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { Question } from '@pub-quiz/shared/src/domain/types';

export const QuestionAsked: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as QuestionAskedState;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  console.log('question asked', state);
  return (
    <div>
      <h1>Round {round.roundNumber + 1}</h1>
      <h2>{round.roundName}</h2>
      <ul>
      {round.questions.map((question: Question) => (
        <li key={question.questionNumber}>
          <p>Question {question.questionNumber + 1}</p>
          <p>{question.questionText}</p>
          {question.questionOptions && (
            <ul>
              {question.questionOptions.map(option => (
                <li>{option}</li>
              ))}
            </ul>
          )}
          {/* <p placeholder="Your answer" /> */}
        </li>
      ))}
      </ul>
    </div>
  );
};
