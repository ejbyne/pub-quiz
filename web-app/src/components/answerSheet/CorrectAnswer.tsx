import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as Tick } from '../../assets/icons/tick.svg';
import React from 'react';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';

interface AnswerProps {
  question: Question;
  answer: { answer?: string; mark?: number };
  markAnswer: (questionNumber: number, mark: number) => void;
}

export const CorrectAnswer: React.FC<AnswerProps> = ({
  question,
  answer,
  markAnswer,
}) => (
  <div className="lg:col-start-2 flex justify-between text-green-400">
    <p key={`answerText${question.number}`}>
      Correct answer: {question.answer}
    </p>
    <ul
      key={`score${question.number}`}
      className="ml-4 flex justify-end items-start text-white"
    >
      <li>
        <input
          type="radio"
          id={`${question.number}-score-incorrect`}
          name="none"
          className="hidden"
          onClick={(e) => markAnswer(question.number, 0)}
          onChange={() => {}}
          disabled={Boolean(answer.answer)}
        />
        <label htmlFor={`${question.number}-score-incorrect`}>
          <div
            className={`w-12 h-10 ${
              !answer?.answer || answer?.mark === 0
                ? 'bg-red-400'
                : 'bg-gray-400'
            } flex justify-center items-center cursor-pointer rounded-l border-2 border-r border-white transition-colors`}
          >
            <Cross className="w-5" title="Mark incorrect" />
          </div>
        </label>
      </li>
      <li>
        <input
          type="radio"
          id={`${question.number}-score-correct`}
          name="correct"
          className="hidden"
          onClick={(e) => markAnswer(question.number, 1)}
          onChange={() => {}}
          disabled={Boolean(answer?.answer)}
        />
        <label htmlFor={`${question.number}-score-correct`}>
          <div
            className={`w-12 h-10 ${
              answer?.mark === 1 ? 'bg-green-400' : 'bg-gray-400'
            } flex justify-center items-center cursor-pointer rounded-r border-2 border-l border-white transition-colors`}
          >
            <Tick className="w-5" title="Mark correct" />
          </div>
        </label>
      </li>
    </ul>
  </div>
);
