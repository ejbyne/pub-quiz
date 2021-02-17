import React, { useContext, useState } from "react";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";
import { useJoinQuizMutation } from "@pub-quiz/shared/src/graphql/types";

export const Registration: React.FC = () => {
  const [, updateQuiz] = useContext(QuizContext);
  const [playerName, setPlayerName] = useState<string>("");
  const [quizId, setQuizId] = useState<string>("");

  const [joinQuiz, { called, error }] = useJoinQuizMutation({
    variables: {
      input: {
        quizId,
        playerName,
      },
    },
  });
  const joinQuizError = error?.graphQLErrors?.[0];

  return (
    <section className="w-full lg:w-1/2 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <h1 className="text-2xl font-medium text-center mb-4">
        Registration
      </h1>
      <p className="text-center mb-4">
        Please enter your name and the quiz ID provided by your host
      </p>
      <input
        className="text-input"
        value={playerName}
        placeholder="Name"
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
      <input
        className="text-input"
        value={quizId}
        placeholder="Quiz ID"
        onChange={(e) => setQuizId(e.currentTarget.value)}
      />
      <button
        className="button"
        disabled={!playerName || !quizId || (called && !error)}
        onClick={async () => {
          try {
            await joinQuiz();
            updateQuiz({ type: "JoinedQuiz", payload: { quizId } });
          } catch (error) {
            // Do nothing: we display error message below
          }
        }}
      >
        Join quiz
      </button>
      {joinQuizError ? (
        <p className="text-red-500 text-sm text-center">
          {joinQuizError.message}
        </p>
      ) : null}
    </section>
  );
};
