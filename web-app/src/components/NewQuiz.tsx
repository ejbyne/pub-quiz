import React, { useReducer, Reducer } from 'react';
import { Layout } from './Layout';
import { NewQuizAction } from '@pub-quiz/shared/src/domain/newQuizTypes';
import { SaveQuizInput } from '@pub-quiz/shared/src/graphql/types';
import {
  emptyQuiz,
  newQuizReducer,
} from '@pub-quiz/shared/src/domain/newQuizReducer';

export const NewQuiz = () => {
  const [newQuiz, updateNewQuiz] = useReducer<
    Reducer<SaveQuizInput, NewQuizAction>
  >(newQuizReducer, emptyQuiz);

  return (
    <Layout>
      <section className="w-full px-6 py-6 flex flex-col bg-indigo-900 lg:shadow-2xl lg:rounded-lg flex-grow text-gray-200 overflow-y-auto">
        <h1>New quiz</h1>
        <form className="flex flex-col">
          <label>
            Quiz name
            <input
              className="text-input mb-4"
              value={newQuiz.quizName}
              onChange={(e) =>
                updateNewQuiz({
                  type: 'QuizNameAmended',
                  payload: {
                    quizName: e.currentTarget.value,
                  },
                })
              }
            />
          </label>
          {newQuiz.rounds.map((round, roundIndex) => (
            <div key={roundIndex}>
              <label>
                Round {roundIndex + 1}
                <input
                  className="text-input mb-4"
                  value={round.roundName}
                  onChange={(e) =>
                    updateNewQuiz({
                      type: 'RoundNameAmended',
                      payload: {
                        roundNumber: roundIndex,
                        roundName: e.currentTarget.value,
                      },
                    })
                  }
                />
              </label>
              <button
                className="button"
                type="button"
                onClick={() =>
                  updateNewQuiz({
                    type: 'RoundRemoved',
                    payload: {
                      roundNumber: roundIndex,
                    },
                  })
                }
              >
                Remove round
              </button>
              {round.questions.map((question, questionIndex) => (
                <div key={`${roundIndex}-${questionIndex}`}>
                  <div className="flex">
                    <p>Question {questionIndex + 1}</p>
                    <button
                      className="button"
                      type="button"
                      onClick={() =>
                        updateNewQuiz({
                          type: 'QuestionRemoved',
                          payload: {
                            roundNumber: roundIndex,
                            questionNumber: questionIndex,
                          },
                        })
                      }
                    >
                      Remove question
                    </button>
                  </div>
                  <label>
                    Question
                    <input
                      className="text-input mb-4"
                      value={question.text}
                      onChange={(e) =>
                        updateNewQuiz({
                          type: 'QuestionAmended',
                          payload: {
                            roundNumber: roundIndex,
                            questionNumber: questionIndex,
                            text: e.currentTarget.value,
                            answer: question.answer,
                          },
                        })
                      }
                    />
                  </label>
                  <label>
                    Answer
                    <input
                      className="text-input mb-4"
                      value={question.answer}
                      onChange={(e) =>
                        updateNewQuiz({
                          type: 'QuestionAmended',
                          payload: {
                            roundNumber: roundIndex,
                            questionNumber: questionIndex,
                            text: question.text,
                            answer: e.currentTarget.value,
                          },
                        })
                      }
                    />
                  </label>
                </div>
              ))}
              <button
                className="button"
                type="button"
                onClick={() =>
                  updateNewQuiz({
                    type: 'QuestionAdded',
                    payload: {
                      roundNumber: roundIndex,
                    },
                  })
                }
              >
                Add question
              </button>
            </div>
          ))}
          <button
            className="button"
            type="button"
            onClick={() =>
              updateNewQuiz({
                type: 'RoundAdded',
              })
            }
          >
            Add round
          </button>
        </form>
      </section>
    </Layout>
  );
};
