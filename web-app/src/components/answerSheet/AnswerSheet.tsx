import React, { useContext } from 'react';
import {
  QuestionAnswered,
  QuestionAsked,
  QuizStatus,
} from '@pub-quiz/shared/src/graphql/types';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';
import { SubmitAnswers } from './SubmitAnswers';
import { SubmitMarks } from './SubmitMarks';
import { QuestionField } from './QuestionField';
import { useAnswerSheetRefs } from '../../hooks/useAnswerSheetRefs';
import { useSubmitAnswers } from '../../hooks/useSubmitAnswers';
import { useSubmitMarks } from '../../hooks/useSubmitMarks';

export const AnswerSheet: React.FC = () => {
  const [quiz] = useContext(QuizContext);
  const [answerSheet, updateAnswerSheet] = useContext(AnswerSheetContext);
  const state = quiz.state as QuestionAsked | QuestionAnswered;
  const round = quiz.rounds[state.roundSummary.roundNumber];
  const answers = answerSheet.rounds[round.roundNumber];

  const { containerRef, questionRefs } = useAnswerSheetRefs(round, state);
  const { submitAnswers, submitAnswersCalled } = useSubmitAnswers(state, round);
  const { submitMarks, submitMarksCalled } = useSubmitMarks(state, round);

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

  const roundFinished = state.status === QuizStatus.RoundFinished;
  const showAnswers = state.status === QuizStatus.QuestionAnswered;

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
              <QuestionField
                question={question}
                answer={answers[question.number]}
                questionRef={questionRefs[question.number]}
                disabled={showAnswers}
                changeAnswer={changeAnswer}
                markAnswer={markAnswer}
              />
            ),
        )}
      </div>
      {roundFinished && (
        <SubmitAnswers
          round={round}
          submitAnswers={submitAnswers}
          submitAnswersCalled={submitAnswersCalled}
        />
      )}
      {showAnswers && (
        <SubmitMarks
          submitMarks={submitMarks}
          submitMarksCalled={submitMarksCalled}
          answers={answers}
        />
      )}
    </section>
  );
};
