import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';
import React, { Dispatch, SetStateAction } from 'react';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';
import { ReactComponent as PlusCircle } from '../../../assets/icons/plus-circle.svg';

interface ModifySelectedRoundQuestionsProps {
  newQuiz: SaveQuizInput;
  updateNewQuiz: Dispatch<NewQuizAction>;
  selectedRound: number;
  setSelectedRound: Dispatch<SetStateAction<number>>;
}

export const ModifySelectedRoundQuestions: React.FC<ModifySelectedRoundQuestionsProps> = ({
  newQuiz,
  updateNewQuiz,
  selectedRound,
  setSelectedRound,
}) => {
  const round = newQuiz.rounds[selectedRound];
  return (
    <>
      {round.questions.map((question, questionIndex) => (
        <div
          key={`question-${questionIndex}`}
          className="flex flex-col w-full items-center mb-4"
        >
          <div className="w-full flex justify-center items-center">
            <label className="flex-grow flex items-baseline pr-4">
              Question {questionIndex + 1}
              <input
                className="text-input ml-4 flex-grow pr-4"
                value={question.text}
                onChange={(e) =>
                  updateNewQuiz({
                    type: 'QuestionAmended',
                    payload: {
                      roundNumber: selectedRound,
                      questionNumber: questionIndex,
                      text: e.currentTarget.value,
                      answer: question.answer,
                    },
                  })
                }
              />
            </label>
            <label className="flex-grow flex items-baseline mr-4">
              Answer
              <input
                className="text-input ml-4 flex-grow"
                value={question.answer}
                onChange={(e) =>
                  updateNewQuiz({
                    type: 'QuestionAmended',
                    payload: {
                      roundNumber: selectedRound,
                      questionNumber: questionIndex,
                      text: question.text,
                      answer: e.currentTarget.value,
                    },
                  })
                }
              />
            </label>
            <button
              className="icon-button"
              type="button"
              disabled={round.questions.length === 1}
              onClick={() =>
                updateNewQuiz({
                  type: 'QuestionRemoved',
                  payload: {
                    roundNumber: selectedRound,
                    questionNumber: questionIndex,
                  },
                })
              }
            >
              <Delete className="w-6" title="Remove question" />
            </button>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-end">
        <button
          className="icon-button"
          type="button"
          onClick={() =>
            updateNewQuiz({
              type: 'QuestionAdded',
              payload: {
                roundNumber: selectedRound,
              },
            })
          }
        >
          <PlusCircle className="h-6" title="Add question" />
        </button>
      </div>
    </>
  );
};
