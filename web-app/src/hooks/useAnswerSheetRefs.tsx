import { Round } from '@pub-quiz/shared/src/domain/quizTypes';
import {
  QuestionAnswered,
  QuestionAsked,
  QuizStatus,
} from '@pub-quiz/shared/src/graphql/types';
import { RefObject, useEffect, useRef } from 'react';

export const useAnswerSheetRefs = (
  round: Round,
  state: QuestionAsked | QuestionAnswered,
) => {
  const containerRef = useRef<HTMLElement>(null);
  const questionRefs = [...Array(round.numberOfQuestions)].map(
    useRef,
  ) as RefObject<HTMLDivElement>[];

  useEffect(() => {
    if (
      state.status === QuizStatus.QuestionAsked ||
      state.status === QuizStatus.QuestionAnswered
    ) {
      questionRefs[state.question.number].current?.scrollIntoView(false);
    }
    if (state.status === QuizStatus.RoundFinished) {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [state]);
  return { containerRef, questionRefs };
};
