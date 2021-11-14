import React from 'react';
import { Answer } from '@pub-quiz/backend/src/domain/types';
import { useSubmitMarks } from '../../hooks/useSubmitMarks';

interface SubmitMarksProps {
  answers: Answer[];
}

export const SubmitMarks: React.FC<SubmitMarksProps> = ({ answers }) => {
  const { submitMarks, submitMarksCalled } = useSubmitMarks();
  return (
    <button
      className="button mt-6"
      onClick={async () => {
        try {
          await submitMarks();
        } catch (error) {
          console.error('error submitting answers', error);
        }
      }}
      disabled={
        submitMarksCalled ||
        answers?.some((answer) => answer?.answer && answer?.mark === undefined)
      }
    >
      Submit marks
    </button>
  );
};
