import React, { RefObject, useContext, useEffect, useRef } from 'react';
import {
  QuestionAnswered,
  QuestionAsked,
  QuizStatus,
  useSubmitAnswersMutation,
  useSubmitMarksMutation,
} from '@pub-quiz/shared/src/graphql/types';
import { QuizContext } from '@pub-quiz/shared/src/context/quizContext';
import { Question } from '@pub-quiz/shared/src/domain/quizTypes';
import { AnswerSheetContext } from '@pub-quiz/shared/src/context/answerSheetContext';
import { ReactComponent as Tick } from '../assets/icons/tick.svg';
import { ReactComponent as Cross } from '../assets/icons/cross.svg';

export const AnswerSheet: React.FC<{}> = () => {
  const [quiz] = useContext(QuizContext);
  const [answerSheet, updateAnswerSheet] = useContext(AnswerSheetContext);
  const state = quiz.state as QuestionAsked | QuestionAnswered;
  const round = quiz.rounds[state.roundSummary.roundNumber];
  const answers = answerSheet.rounds[round.roundNumber];
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

  const [
    submitAnswers,
    { called: submitAnswersCalled },
  ] = useSubmitAnswersMutation({
    variables: {
      input: {
        quizId: state.quizId,
        playerName: answerSheet.playerName!,
        roundNumber: round.roundNumber,
        answers: answers?.map((answer) => answer?.answer ?? null) ?? [],
      },
    },
  });

  const [submitMarks, { called: submitMarksCalled }] = useSubmitMarksMutation({
    variables: {
      input: {
        quizId: state.quizId,
        playerName: answerSheet.playerName!,
        roundNumber: round.roundNumber,
        marks: answers?.map((answer) => answer?.mark ?? null) ?? [],
      },
    },
  });

  const changeAnswer = (questionNumber: number, answer: string) =>
    updateAnswerSheet({
      type: 'AnswerChanged',
      payload: {
        roundNumber: round.roundNumber,
        questionNumber,
        answer,
      },
    });

  const markAnswer = (questionNumber: number, mark: number) =>
    updateAnswerSheet({
      type: 'AnswerMarked',
      payload: {
        roundNumber: round.roundNumber,
        questionNumber,
        mark,
      },
    });

  const showQuestions = state.status === QuizStatus.QuestionAsked;
  const roundFinished = state.status === QuizStatus.RoundFinished;
  const showAnswers = state.status === QuizStatus.QuestionAnswered;

  return (
    <section
      ref={containerRef}
      className="w-full lg:w-1/2 px-6 py-6 flex flex-col items-stretch bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto"
    >
      <h1 className="text-2xl text-center mb-4">
        Round {round.roundNumber + 1}
      </h1>
      <h2 className="text-xl text-center mb-4">{round.roundName}</h2>
      <div className="flex-grow">
        {round.questions.map(
          (question?: Question) =>
            question && (
              <div
                ref={questionRefs[question.number]}
                key={`questionContainer${question.number}`}
                className="grid lg:grid-cols-2 gap-4 py-5 items-baseline"
              >
                <h3
                  key={`questionTitle${question.number}`}
                  className="lg:col-span-2 font-semibold"
                >
                  Question {question.number + 1}
                </h3>
                <p
                  key={`questionText${question.number}`}
                  className="row-span-2"
                >
                  {question.text}
                </p>
                {question.options ? (
                  <ul
                    key={`questionOptions${question.number}`}
                    className="list-alphabet ml-5"
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
                            disabled={showAnswers}
                          />
                          <label
                            htmlFor={`${question.number}-option-${option}`}
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
                    className="w-full text-input"
                    placeholder={`Answer ${question.number + 1}`}
                    onChange={(e) =>
                      changeAnswer(question.number, e.currentTarget.value)
                    }
                    value={answers?.[question.number]?.answer ?? ''}
                    disabled={showAnswers}
                  />
                )}
                {question.answer && (
                  <div className="lg:col-start-2 flex justify-between text-green-400">
                    <p key={`answerText${question.number}`}>
                      Correct answer: {question.answer}
                    </p>
                    <ul
                      key={`score${question.number}`}
                      className="ml-4 flex justify-end items-start text-white"
                    >
                      <li>
                        <input
                          type="radio"
                          id={`${question.number}-score-incorrect`}
                          name="none"
                          className="hidden"
                          onClick={(e) => markAnswer(question.number, 0)}
                          onChange={() => {}}
                          disabled={!answers?.[question.number]?.answer}
                        />
                        <label htmlFor={`${question.number}-score-incorrect`}>
                          <div
                            className={`w-12 h-10 ${
                              !answers?.[question.number]?.answer ||
                              answers?.[question.number]?.mark === 0
                                ? 'bg-red-400'
                                : 'bg-gray-400'
                            } flex justify-center items-center cursor-pointer rounded-l border-2 border-r border-white transition-colors`}
                          >
                            <Cross className="w-5" title="Mark incorrect" />
                          </div>
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id={`${question.number}-score-correct`}
                          name="correct"
                          className="hidden"
                          onClick={(e) => markAnswer(question.number, 1)}
                          onChange={() => {}}
                          disabled={!answers?.[question.number]?.answer}
                        />
                        <label htmlFor={`${question.number}-score-correct`}>
                          <div
                            className={`w-12 h-10 ${
                              answers?.[question.number]?.mark === 1
                                ? 'bg-green-400'
                                : 'bg-gray-400'
                            } flex justify-center items-center cursor-pointer rounded-r border-2 border-l border-white transition-colors`}
                          >
                            <Tick className="w-5" title="Mark correct" />
                          </div>
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ),
        )}
      </div>
      {roundFinished && (
        <>
          <h2 className="text-xl text-center mt-10 mb-6 semi-bold">
            Round {round.roundNumber + 1} completed
          </h2>
          <p className="text-center">Please submit your answers</p>
          <button
            className="button mt-6"
            onClick={async () => {
              try {
                await submitAnswers();
              } catch (error) {
                console.error('error submitting answers', error);
              }
            }}
            disabled={submitAnswersCalled}
          >
            Submit answers
          </button>
        </>
      )}
      {showAnswers && (
        <button
          className="button mt-6"
          onClick={async () => {
            try {
              await submitMarks();
            } catch (error) {
              console.error('error submitting answers', error);
            }
          }}
          disabled={
            submitMarksCalled ||
            answers?.some(
              (answer) => answer?.answer && answer?.mark === undefined,
            )
          }
        >
          Submit marks
        </button>
      )}
    </section>
  );
};
