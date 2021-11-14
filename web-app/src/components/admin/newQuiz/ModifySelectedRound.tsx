import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';
import React, { Dispatch, SetStateAction } from 'react';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';

interface ModifyRoundProps {
  newQuiz: SaveQuizInput;
  updateNewQuiz: Dispatch<NewQuizAction>;
  selectedRound: number;
  setSelectedRound: Dispatch<SetStateAction<number>>;
}

export const ModifySelectedRound: React.FC<ModifyRoundProps> = ({
  newQuiz,
  updateNewQuiz,
  selectedRound,
  setSelectedRound,
}) => {
  const round = newQuiz.rounds[selectedRound];
  const isLastRound = newQuiz.rounds.length === selectedRound + 1;
  return (
    <div className="w-full flex items-center mb-14">
      <label className="flex w-2/3 items-baseline mr-4">
        <span className="w-1/2 text-right pr-4">Round name</span>
        <input
          className="w-1/2 text-input"
          placeholder="Choose a round name"
          value={round.roundName}
          onChange={(e) =>
            updateNewQuiz({
              type: 'RoundNameAmended',
              payload: {
                roundNumber: selectedRound,
                roundName: e.currentTarget.value,
              },
            })
          }
        />
      </label>
      <button
        className="icon-button"
        type="button"
        disabled={newQuiz.rounds.length === 1}
        onClick={() => {
          if (isLastRound) {
            setSelectedRound((selectedRound) => selectedRound - 1);
          }
          updateNewQuiz({
            type: 'RoundRemoved',
            payload: {
              roundNumber: selectedRound,
            },
          });
        }}
      >
        <Delete className="w-6" title="Remove round" />
      </button>
    </div>
  );
};
