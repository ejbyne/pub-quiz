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
    <div>
      <h1>Pub Quiz</h1>
      <input
        value={playerName}
        placeholder="Name"
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
      <input
        value={quizId}
        placeholder="Quiz ID"
        onChange={(e) => setQuizId(e.currentTarget.value)}
      />
      <button
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
    </div>
  );
};
