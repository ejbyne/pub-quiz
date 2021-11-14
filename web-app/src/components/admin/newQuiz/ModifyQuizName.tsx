import React, { Dispatch, SetStateAction } from 'react';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';

interface ModifyQuizNameProps {
  newQuiz: SaveQuizInput;
  updateNewQuiz: Dispatch<NewQuizAction>;
}

export const ModifyQuizName: React.FC<ModifyQuizNameProps> = ({
  newQuiz,
  updateNewQuiz,
}) => {
  return (
    <label className="w-full flex items-baseline mb-10">
      <span className="w-1/3 text-right pr-4">Quiz name</span>
      <input
        className="w-1/3 text-input"
        placeholder="Choose a quiz name"
        value={newQuiz.quizName}
        onChange={(e) =>
          updateNewQuiz({
            type: 'QuizNameAmended',
            payload: {
              quizName: e.currentTarget.value,
            },
          })
        }
      />
    </label>
  );
};
