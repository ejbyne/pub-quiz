import React, { useContext } from 'react';
import {
  QuestionAsked,
  useSubmitAnswersMutation,
} from '@pub-quiz/shared/src/graphql/types';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';
import { QuestionAnswered } from '@pub-quiz/shared/src/graphql/types';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';

export const AnswerSheet: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const [answerSheet, updateAnswerSheet] = useContext(AnswerSheetContext);
  const state = quiz.state as QuestionAsked | QuestionAnswered;
  const round = quiz.rounds[state.roundSummary.roundNumber];
  const answers = answerSheet.rounds[round.roundNumber];

  const [submitAnswers, { called }] = useSubmitAnswersMutation({
    variables: {
      input: {
        quizId: state.quizId,
        playerName: answerSheet.playerName!,
        roundNumber: round.roundNumber,
        answers,
      },
    },
  });

  const changeAnswer = (questionNumber: number, answer: string) =>
    updateAnswerSheet({
      type: 'AnswerChanged',
      payload: {
        roundNumber: round.roundNumber,
        questionNumber,
        answer: answer,
      },
    });

  return (
    <section className="w-full lg:w-1/2 px-4 py-4 flex flex-col items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
      <h1 className="text-2xl text-center mb-4">
        Round {round.roundNumber + 1}
      </h1>
      <h2 className="text-xl text-center mb-4">{round.roundName}</h2>
      <ul className="flex-grow">
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
                            className="ml-2"
                            type="radio"
                            id={option}
                            name={`Question ${question.number} + 1`}
                            value={option}
                            checked={
                              answers?.[question.number]?.answer === option
                            }
                            onClick={(e) =>
                              changeAnswer(
                                question.number,
                                e.currentTarget.value,
                              )
                            }
                            onChange={() => {}}
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
                    onChange={(e) =>
                      changeAnswer(question.number, e.currentTarget.value)
                    }
                    value={answers?.[question.number]?.answer ?? ''}
                  />
                )}
              </li>
            ),
        )}
      </ul>
      <button
        className="button mt-6"
        onClick={async () => {
          try {
            await submitAnswers();
          } catch (error) {
            console.error('error submitting answers', error);
          }
        }}
        disabled={called || state.question.number < round.numberOfQuestions - 1}
      >
        Submit answers
      </button>
    </section>
  );
};
