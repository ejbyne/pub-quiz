import { ReactComponent as Rewind } from '../../../assets/icons/rewind.svg';
import { ReactComponent as PlusCircle } from '../../../assets/icons/plus-circle.svg';
import { ReactComponent as FastForward } from '../../../assets/icons/fast-forward.svg';
import React, {
  Dispatch,
  Reducer,
  SetStateAction,
  useReducer,
  useState,
} from 'react';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';
import {
  emptyQuiz,
  newQuizReducer,
} from '@pub-quiz/shared/src/domain/newQuizReducer';

interface SelectRoundProps {
  newQuiz: SaveQuizInput;
  updateNewQuiz: Dispatch<NewQuizAction>;
  selectedRound: number;
  setSelectedRound: Dispatch<SetStateAction<number>>;
}

export const SelectRound: React.FC<SelectRoundProps> = ({
  newQuiz,
  updateNewQuiz,
  selectedRound,
  setSelectedRound,
}) => {
  const isFirstRound = selectedRound === 0;
  const isLastRound = newQuiz.rounds.length === selectedRound + 1;

  return (
    <div className="flex justify-center mb-10 items-center">
      <button
        className="icon-button"
        type="button"
        disabled={isFirstRound}
        onClick={() => setSelectedRound((selectedRound) => selectedRound - 1)}
      >
        <Rewind className="w-6" title="Previous round" />
      </button>
      <h2 className="text-xl font-medium mx-4">
        Round {selectedRound + 1} of {newQuiz.rounds.length}
      </h2>
      <button
        className="icon-button"
        type="button"
        onClick={() => {
          setSelectedRound((selectedRound) => selectedRound + 1);
          if (isLastRound) {
            updateNewQuiz({
              type: 'RoundAdded',
            });
          }
        }}
      >
        {isLastRound ? (
          <PlusCircle className="w-6" title="Add round" />
        ) : (
          <FastForward className="w-6" title="Next round" />
        )}
      </button>
    </div>
  );
};
