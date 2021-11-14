import React from 'react';
import { Round } from '@pub-quiz/shared/src/domain/quizTypes';
import { useSubmitAnswers } from '../../hooks/useSubmitAnswers';

interface RoundFinishedProps {
  round: Round;
}

export const SubmitAnswers: React.FC<RoundFinishedProps> = ({ round }) => {
  const { submitAnswers, submitAnswersCalled } = useSubmitAnswers();
  return (
    <>
      <h2 className="text-xl text-center mt-10 mb-6 semi-bold">
        Round {round.roundNumber + 1} completed
      </h2>
      <p className="text-center">Please submit your answers</p>
      <button
        className="button mt-6"
        onClick={async () => {
          try {
            await submitAnswers();
          } catch (error) {
            console.error('error submitting answers', error);
          }
        }}
        disabled={submitAnswersCalled}
      >
        Submit answers
      </button>
    </>
  );
};
