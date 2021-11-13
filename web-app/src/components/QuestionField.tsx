import { MultipleChoiceAnswer } from './MultipleChoiceAnswer';
import { TextAnswer } from './TextAnswer';
import { CorrectAnswer } from './CorrectAnswer';
import React, { RefObject } from 'react';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';

interface QuestionFieldProps {
  question: Question;
  answer: { answer?: string; mark?: number };
  questionRef: RefObject<HTMLDivElement>;
  disabled: boolean;
  changeAnswer: (questionNumber: number, answer: string) => void;
  markAnswer: (questionNumber: number, mark: number) => void;
}

export const QuestionField: React.FC<QuestionFieldProps> = ({
  question,
  answer,
  questionRef,
  disabled,
  changeAnswer,
  markAnswer,
}) => (
  <div
    ref={questionRef}
    key={`questionContainer${question.number}`}
    className="grid lg:grid-cols-2 gap-4 py-5 items-baseline"
  >
    <h3
      key={`questionTitle${question.number}`}
      className="lg:col-span-2 font-semibold"
    >
      Question {question.number + 1}
    </h3>
    <p key={`questionText${question.number}`} className="row-span-2">
      {question.text}
    </p>
    {question.options ? (
      <MultipleChoiceAnswer
        question={question}
        answer={answer}
        disabled={disabled}
        changeAnswer={changeAnswer}
      />
    ) : (
      <TextAnswer
        question={question}
        answer={answer}
        changeAnswer={changeAnswer}
        disabled={disabled}
      />
    )}
    {question.answer && (
      <CorrectAnswer
        question={question}
        answer={answer}
        markAnswer={markAnswer}
      />
    )}
  </div>
);
