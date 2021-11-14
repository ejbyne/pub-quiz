import React from 'react';
import { QuizStatus } from '@pub-quiz/shared/src/graphql/types';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';
import { SubmitAnswers } from './SubmitAnswers';
import { SubmitMarks } from './SubmitMarks';
import { QuestionBlock } from './QuestionBlock';
import { useScrollToCurrentPosition } from '../../hooks/useScrollToCurrentPosition';
import { useCurrentRound } from '../../hooks/useCurrentRound';
import { useAnswersForRound } from '../../hooks/useAnswersForRound';
import { useQuizState } from '../../hooks/useQuizState';

export const AnswerSheet: React.FC = () => {
  const state = useQuizState();
  const round = useCurrentRound();
  const { updateAnswerSheet, answers } = useAnswersForRound(round);
  const { containerRef, questionRefs } = useScrollToCurrentPosition();

  const changeAnswer = (questionNumber: number, answer: string) =>
    updateAnswerSheet({
      type: 'AnswerChanged',
      payload: {
        roundNumber: round.roundNumber,
        questionNumber,
        answer,
      },
    });

  const markAnswer = (questionNumber: number, mark: number) =>
    updateAnswerSheet({
      type: 'AnswerMarked',
      payload: {
        roundNumber: round.roundNumber,
        questionNumber,
        mark,
      },
    });

  return (
    <section
      ref={containerRef}
      className="w-full lg:w-1/2 px-6 py-6 flex flex-col items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto"
    >
      <h1 className="text-2xl text-center mb-4">
        Round {round.roundNumber + 1}
      </h1>
      <h2 className="text-xl text-center mb-4">{round.roundName}</h2>
      <div className="flex-grow">
        {round.questions.map(
          (question?: Question) =>
            question && (
              <QuestionBlock
                key={`question${question.number}`}
                question={question}
                answer={answers?.[question.number]}
                questionRef={questionRefs[question.number]}
                disabled={state.status === QuizStatus.QuestionAnswered}
                changeAnswer={changeAnswer}
                markAnswer={markAnswer}
              />
            ),
        )}
      </div>
      {state.status === QuizStatus.RoundFinished && (
        <SubmitAnswers round={round} />
      )}
      {state.status === QuizStatus.QuestionAnswered && (
        <SubmitMarks answers={answers} />
      )}
    </section>
  );
};
