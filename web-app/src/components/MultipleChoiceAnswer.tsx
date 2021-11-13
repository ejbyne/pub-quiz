import React from 'react';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';

interface MultipleChoiceQuestionProps {
  question: Question;
  answer: { answer?: string; mark?: number };
  disabled: boolean;
  changeAnswer: (questionNumber: number, answer: string) => void;
}

export const MultipleChoiceAnswer: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  answer,
  disabled,
  changeAnswer,
}) => (
  <ul key={`questionOptions${question.number}`} className="list-alphabet ml-5">
    {question.options?.map((option, index) => (
      <li key={`questionOptions${question.number}.${index}`}>
        <span className="flex items-baseline">
          <input
            className="ml-2"
            type="radio"
            id={`${question?.number}-option-${option}`}
            name={`Question ${question.number} + 1`}
            value={option}
            checked={answer?.answer === option}
            onClick={(e) =>
              changeAnswer(question.number, e.currentTarget.value)
            }
            onChange={() => {}}
            disabled={disabled}
          />
          <label
            htmlFor={`${question.number}-option-${option}`}
            className="ml-2 align"
          >
            {option}
          </label>
        </span>
      </li>
    ))}
  </ul>
);
