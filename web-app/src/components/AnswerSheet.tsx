import React, { useContext } from 'react';
import {
  QuestionAsked,
  QuizStatus,
  useSubmitAnswersMutation,
} from '@pub-quiz/shared/src/graphql/types';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';
import { QuestionAnswered } from '@pub-quiz/shared/src/graphql/types';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';
import { ReactComponent as Cross } from '../assets/icons/cross.svg';

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

  const showAnswers = state.status === QuizStatus.QuestionAnswered;

  return (
    <section className="w-full lg:w-1/2 px-6 py-6 flex flex-col items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
      <h1 className="text-2xl text-center mb-4">
        Round {round.roundNumber + 1}
      </h1>
      <h2 className="text-xl text-center mb-4">{round.roundName}</h2>
      <div className="flex-grow">
        {round.questions.map(
          (question?: Question) =>
            question && (
              <div
                key={`questionContainer${question.number}`}
                className={`grid grid-cols-${showAnswers ? '2' : '1'} gap-2`}
              >
                <h3
                  key={`questionTitle${question.number}`}
                  className="font-semibold my-2"
                >
                  Question {question.number + 1}
                </h3>
                {question.answer && (
                  <h3
                    key={`answerTitle${question.number}`}
                    className="font-semibold my-2"
                  >
                    Answer
                  </h3>
                )}
                <p key={`questionText${question.number}`}>{question.text}</p>
                {question.answer && (
                  <p key={`answerText${question.number}`}>{question.answer}</p>
                )}
                {question.options ? (
                  <ul
                    key={`questionOptions${question.number}`}
                    className="list-alphabet ml-4 my-2"
                  >
                    {question.options.map((option, index) => (
                      <li key={`questionOptions${question.number}.${index}`}>
                        <span className="flex items-baseline">
                          <input
                            className="ml-2"
                            type="radio"
                            id={`${question?.number}-option-${option}`}
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
                          <label
                            htmlFor={`${question?.number}-option-${option}`}
                            className="ml-2 align"
                          >
                            {option}
                          </label>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <input
                    key={`questionInput${question.number}`}
                    className="w-full my-2 text-input"
                    placeholder={`Answer ${question.number + 1}`}
                    onChange={(e) =>
                      changeAnswer(question.number, e.currentTarget.value)
                    }
                    value={answers?.[question.number]?.answer ?? ''}
                  />
                )}
                {question.answer && (
                  <ul
                    key={`score${question.number}`}
                    className="flex items-end my-2"
                  >
                    <li>
                      <input
                        type="radio"
                        id={`${question?.number}-score-incorrect`}
                        name="none"
                        className="hidden"
                        onClick={(e) => {}}
                        onChange={() => {}}
                      />
                      <label htmlFor={`${question?.number}-score-incorrect`}>
                        <div className="w-12 h-10 bg-gray-400 flex justify-center items-center cursor-pointer rounded-l border-2 border-r border-white">
                          <Cross className="w-5" title="Mark incorrect" />
                        </div>
                      </label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id={`${question?.number}-score-correct`}
                        name="correct"
                        className="hidden"
                        onClick={(e) => {}}
                        onChange={() => {}}
                      />
                      <label htmlFor={`${question?.number}-score-correct`}>
                        <div className="w-12 h-10 bg-gray-400 flex justify-center items-center cursor-pointer rounded-r border-2 border-l border-white">
                          <Tick className="w-5" title="Mark correct" />
                        </div>
                      </label>
                    </li>
                  </ul>
                )}
              </div>
            ),
        )}
      </div>
      {showAnswers ? (
        <button
          className="button mt-6"
          onClick={() => {}}
          disabled={state.question.number < round.numberOfQuestions - 1}
        >
          Submit marks
        </button>
      ) : (
        <button
          className="button mt-6"
          onClick={async () => {
            try {
              await submitAnswers();
            } catch (error) {
              console.error('error submitting answers', error);
            }
          }}
          disabled={
            called || state.question.number < round.numberOfQuestions - 1
          }
        >
          Submit answers
        </button>
      )}
    </section>
  );
};
