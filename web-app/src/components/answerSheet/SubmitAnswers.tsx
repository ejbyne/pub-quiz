import React from 'react';
import { Round } from '@pub-quiz/shared/src/domain/quizTypes';

interface RoundFinishedProps {
  round: Round;
  submitAnswers: () => void;
  submitAnswersCalled: boolean;
}

export const SubmitAnswers: React.FC<RoundFinishedProps> = ({
  round,
  submitAnswers,
  submitAnswersCalled,
}) => (
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
