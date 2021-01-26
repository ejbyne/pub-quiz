import React, { useReducer, Reducer, Dispatch } from "react";
import { ApolloProvider, ApolloClient } from "@apollo/react-hooks";
import { NextQuizState, Quiz, QuizAction } from "../domain/types";
import { quizReducer } from "../domain/quizReducer";
import { QuizContext } from "../context/quizContext";

let mockUpdateQuiz: Dispatch<QuizAction>;

export const receiveNextQuizState = (payload: NextQuizState) =>
  mockUpdateQuiz({
    type: "NextQuizStateReceived",
    payload,
  });

export const TestAppContainer: React.FC<{
  client: ApolloClient<any>;
  initialState?: Quiz;
}> = ({ client, initialState = { rounds: [] }, children }) => {
  const [quiz, updateQuiz] = useReducer<Reducer<Quiz, QuizAction>>(
    quizReducer,
    initialState
  );

  mockUpdateQuiz = updateQuiz;

  return (
    <ApolloProvider client={client as any}>
      <QuizContext.Provider value={[quiz, updateQuiz]}>
        {children}
      </QuizContext.Provider>
    </ApolloProvider>
  );
};
