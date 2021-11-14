import React from 'react';
import { useSubmitMarks } from '../../hooks/useSubmitMarks';

interface SubmitMarksProps {
  answers: { answer?: string; mark?: number }[];
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
