import React, { useContext } from "react";
import { QuestionAsked } from "@pub-quiz/shared/src/graphql/types";
import { QuizContext } from "@pub-quiz/shared/src/context/quizContext";
import { Question } from "@pub-quiz/shared/src/domain/types";
import { QuestionAnswered } from "@pub-quiz/shared/src/graphql/types";

export const QuestionSheet: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const state = quiz.state as QuestionAsked | QuestionAnswered;
  const round = quiz.rounds[state.roundSummary.roundNumber];

  return (
    <section className="w-full lg:w-1/2 px-4 py-8 flex flex-col items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg absolute top-24 bottom-4 text-gray-200 overflow-y-auto">
      <h1 className="text-2xl text-center mb-4">
        Round {round.roundNumber + 1}
      </h1>
      <h2 className="text-lg font-light text-center mb-4">{round.roundName}</h2>
      <ul>
        {round.questions.map(
          (question?: Question) =>
            question && (
              <li key={question.number}>
                <p className="font-semibold my-2">
                  Question {question.number + 1}
                </p>
                <p>{question.text}</p>
                {question.answer && (
                  <p className="font-semibold my-2">
                    Answer: {question.answer}
                </p>
                )}
                {question.options ? (
                  <ul className="list-alphabet ml-4 my-2">
                    {question.options.map((option) => (
                      <li key={option}>
                        <span className="flex items-baseline">
                          <input
                            type="radio"
                            id={option}
                            name={option}
                            value={option}
                            className="ml-2"
                          />
                          <label htmlFor={option} className="ml-2 align">
                            {option}
                          </label>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <input
                    className="w-full my-2 text-input"
                    placeholder={`Answer ${question.number + 1}`}
                    // onChange={(e) => setQuizId(e.currentTarget.value)}
                  />
                )}
              </li>
            )
        )}
      </ul>
    </section>
  );
};
