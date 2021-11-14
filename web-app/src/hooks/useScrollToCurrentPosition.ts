import { QuizStatus } from '@pub-quiz/shared/src/graphql/types';
import { RefObject, useEffect, useRef } from 'react';
import { useQuizState } from './useQuizState';
import { useCurrentRound } from './useCurrentRound';

export const useScrollToCurrentPosition = () => {
  const state = useQuizState();
  const round = useCurrentRound();

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
