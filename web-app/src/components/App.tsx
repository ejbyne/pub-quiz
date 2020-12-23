import React, { useContext } from "react";
import { QuizContext } from "../shared/context/quizContext";
import { useQuizStateSubscription, useQuizSummaryQuery } from "../shared/graphql/types";
import { getComponentFromStatus } from "./getComponentFromStatus";

export const App: React.FC = () => {
  const [quiz, updateQuiz] = useContext(QuizContext);

  const CurrentStep = getComponentFromStatus(quiz?.state?.status);

  useQuizSummaryQuery({
    variables: {
      quizId: quiz?.quizId as any,
    },
    onCompleted: (data) => {
      const quizSummary = data?.quizSummary;
      if (quizSummary) {
        updateQuiz({ type: "QuizSummaryReceived", payload: quizSummary });
      }
    },
    skip: !quiz.quizId,
  });

  useQuizStateSubscription({
    variables: { quizId: quiz?.quizId as string },
    onSubscriptionData: (data: any) => {
      const nextQuizState = data?.subscriptionData?.data?.nextQuizState;
      if (nextQuizState) {
        updateQuiz({ type: "NextQuizStateReceived", payload: nextQuizState });
      }
    },
    skip: !quiz.quizId,
  });

  return (
    <div>
      <CurrentStep />
    </div>
  );
};
