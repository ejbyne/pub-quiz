import React from 'react';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';

interface TextQuestionProps {
  question: Question;
  answer: { answer?: string; mark?: number };
  changeAnswer: (questionNumber: number, answer: string) => void;
  disabled: boolean;
}

export const TextAnswer: React.FC<TextQuestionProps> = ({
  question,
  answer,
  changeAnswer,
  disabled,
}) => (
  <input
    key={`questionInput${question.number}`}
    className="w-full text-input"
    placeholder={`Answer ${question.number + 1}`}
    onChange={(e) => changeAnswer(question.number, e.currentTarget.value)}
    value={answer?.answer ?? ''}
    disabled={disabled}
  />
);
