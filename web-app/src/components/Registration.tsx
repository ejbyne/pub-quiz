import React, { useContext, useState } from "react";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";
import { useJoinQuizMutation } from "@pub-quiz/shared/src/graphql/types";

import QuizLogo from "../assets/images/team.svg";

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
    <section className="w-full lg:w-1/3 px-4 py-8 flex flex-col justify-center items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg relative">
      <div className="h-32 mb-12 relative">
        <img src={QuizLogo} alt="Quiz Logo" className="h-32 mb-2" />
        <h1 className="absolute bottom-0 left-24 text-white text-2xl text-center font-mono select-none">
          Pub Quiz
        </h1>
      </div>
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
        disabled={called && !error}
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
      {joinQuizError ? <p>{joinQuizError.message}</p> : null}
    </section>
  );
};
