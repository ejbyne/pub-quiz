import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AskedQuestion = AskedQuestionWithoutAnswer | AskedQuestionWithAnswer;

export type AskedQuestionWithAnswer = {
  __typename?: 'AskedQuestionWithAnswer';
  number: Scalars['Int'];
  text: Scalars['String'];
  options?: Maybe<Array<Scalars['String']>>;
  answer: Scalars['String'];
};

export type AskedQuestionWithoutAnswer = {
  __typename?: 'AskedQuestionWithoutAnswer';
  number: Scalars['Int'];
  text: Scalars['String'];
  options?: Maybe<Array<Scalars['String']>>;
};

export type GenerateRandomQuizInput = {
  quizName: Scalars['String'];
};

export type JoinQuizInput = {
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  generateRandomQuiz: QuizGenerated;
  saveQuiz: Scalars['Boolean'];
  joinQuiz: PlayerJoined;
  nextQuizState: QuizState;
  submitAnswers: PlayerSubmittedAnswers;
  submitMarks: PlayerSubmittedMarks;
};


export type MutationGenerateRandomQuizArgs = {
  input: GenerateRandomQuizInput;
};


export type MutationSaveQuizArgs = {
  input: SaveQuizInput;
};


export type MutationJoinQuizArgs = {
  input: JoinQuizInput;
};


export type MutationNextQuizStateArgs = {
  input: NextQuizStateInput;
};


export type MutationSubmitAnswersArgs = {
  input: SubmitAnswersInput;
};


export type MutationSubmitMarksArgs = {
  input: SubmitMarksInput;
};

export type NextQuizStateInput = {
  quizId: Scalars['ID'];
};

export type Player = {
  __typename?: 'Player';
  name: Scalars['String'];
  status: PlayerStatus;
};

export type PlayerJoined = {
  __typename?: 'PlayerJoined';
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type PlayerMarks = {
  __typename?: 'PlayerMarks';
  playerName: Scalars['String'];
  rounds: Array<PlayerMarksForRound>;
  quizTotal: Scalars['Int'];
};

export type PlayerMarksForRound = {
  __typename?: 'PlayerMarksForRound';
  marks: Array<Scalars['Int']>;
  roundTotal: Scalars['Int'];
};

export enum PlayerStatus {
  Playing = 'PLAYING',
  AnswersSubmitted = 'ANSWERS_SUBMITTED',
  MarksSubmitted = 'MARKS_SUBMITTED'
}

export type PlayerSubmittedAnswers = {
  __typename?: 'PlayerSubmittedAnswers';
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type PlayerSubmittedMarks = {
  __typename?: 'PlayerSubmittedMarks';
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  quizzes: Array<Quiz>;
  quizSummary: QuizSummary;
};


export type QueryQuizSummaryArgs = {
  quizId: Scalars['ID'];
};

export type Question = {
  __typename?: 'Question';
  text: Scalars['String'];
  options?: Maybe<Array<Scalars['String']>>;
  answer: Scalars['String'];
};

export type QuestionAnswered = QuizState & {
  __typename?: 'QuestionAnswered';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
  question: AskedQuestionWithAnswer;
};

export type QuestionAsked = QuizState & {
  __typename?: 'QuestionAsked';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
  question: AskedQuestionWithoutAnswer;
};

export type QuestionInput = {
  text: Scalars['String'];
  answer: Scalars['String'];
  options?: Maybe<Array<Scalars['String']>>;
};

export type Quiz = {
  __typename?: 'Quiz';
  quizId: Scalars['ID'];
  quizName: Scalars['String'];
  rounds: Array<Round>;
};

export type QuizFinished = QuizState & {
  __typename?: 'QuizFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
  marks: Array<PlayerMarks>;
};

export type QuizGenerated = {
  __typename?: 'QuizGenerated';
  quizId: Scalars['ID'];
  quizName: Scalars['String'];
};

export type QuizNotYetStarted = QuizState & {
  __typename?: 'QuizNotYetStarted';
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export type QuizState = {
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export enum QuizStatus {
  QuizNotYetStarted = 'QUIZ_NOT_YET_STARTED',
  RoundStarted = 'ROUND_STARTED',
  QuestionAsked = 'QUESTION_ASKED',
  RoundFinished = 'ROUND_FINISHED',
  QuestionAnswered = 'QUESTION_ANSWERED',
  RoundMarked = 'ROUND_MARKED',
  QuizFinished = 'QUIZ_FINISHED'
}

export type QuizSummary = {
  __typename?: 'QuizSummary';
  quizId: Scalars['ID'];
  quizName: Scalars['String'];
  playerNames?: Maybe<Array<Scalars['String']>>;
  players?: Maybe<Array<Player>>;
  currentRound?: Maybe<Array<AskedQuestion>>;
  state: QuizState;
};

export type Round = {
  __typename?: 'Round';
  roundName: Scalars['String'];
  questions: Array<Question>;
};

export type RoundFinished = QuizState & {
  __typename?: 'RoundFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
};

export type RoundInput = {
  roundName: Scalars['String'];
  questions: Array<QuestionInput>;
};

export type RoundMarked = QuizState & {
  __typename?: 'RoundMarked';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
  marks: Array<PlayerMarks>;
};

export type RoundStarted = QuizState & {
  __typename?: 'RoundStarted';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
};

export type RoundSummary = {
  __typename?: 'RoundSummary';
  roundNumber: Scalars['Int'];
  roundName: Scalars['String'];
  numberOfQuestions: Scalars['Int'];
};

export type SaveQuizInput = {
  quizName: Scalars['String'];
  rounds: Array<RoundInput>;
};

export type SubmitAnswersInput = {
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
  roundNumber: Scalars['Int'];
  answers: Array<Maybe<Scalars['String']>>;
};

export type SubmitMarksInput = {
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
  roundNumber: Scalars['Int'];
  marks: Array<Maybe<Scalars['Int']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  playerJoined?: Maybe<PlayerJoined>;
  playerSubmittedAnswers?: Maybe<PlayerSubmittedAnswers>;
  playerSubmittedMarks?: Maybe<PlayerSubmittedMarks>;
  nextQuizState?: Maybe<QuizState>;
};


export type SubscriptionPlayerJoinedArgs = {
  quizId: Scalars['ID'];
};


export type SubscriptionPlayerSubmittedAnswersArgs = {
  quizId: Scalars['ID'];
};


export type SubscriptionPlayerSubmittedMarksArgs = {
  quizId: Scalars['ID'];
};


export type SubscriptionNextQuizStateArgs = {
  quizId: Scalars['ID'];
};

export type QuizzesQueryVariables = Exact<{ [key: string]: never; }>;


export type QuizzesQuery = (
  { __typename?: 'Query' }
  & { quizzes: Array<(
    { __typename?: 'Quiz' }
    & Pick<Quiz, 'quizId' | 'quizName'>
    & { rounds: Array<(
      { __typename?: 'Round' }
      & Pick<Round, 'roundName'>
      & { questions: Array<(
        { __typename?: 'Question' }
        & Pick<Question, 'text' | 'options' | 'answer'>
      )> }
    )> }
  )> }
);

export type QuizSummaryQueryVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type QuizSummaryQuery = (
  { __typename?: 'Query' }
  & { quizSummary: (
    { __typename?: 'QuizSummary' }
    & Pick<QuizSummary, 'quizId' | 'quizName' | 'playerNames'>
    & { players?: Maybe<Array<(
      { __typename?: 'Player' }
      & Pick<Player, 'name' | 'status'>
    )>>, currentRound?: Maybe<Array<(
      { __typename?: 'AskedQuestionWithoutAnswer' }
      & Pick<AskedQuestionWithoutAnswer, 'number' | 'text' | 'options'>
    ) | (
      { __typename?: 'AskedQuestionWithAnswer' }
      & Pick<AskedQuestionWithAnswer, 'number' | 'text' | 'options' | 'answer'>
    )>>, state: (
      { __typename?: 'QuestionAnswered' }
      & Pick<QuestionAnswered, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ), question: (
        { __typename?: 'AskedQuestionWithAnswer' }
        & Pick<AskedQuestionWithAnswer, 'number' | 'text' | 'options' | 'answer'>
      ) }
    ) | (
      { __typename?: 'QuestionAsked' }
      & Pick<QuestionAsked, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ), question: (
        { __typename?: 'AskedQuestionWithoutAnswer' }
        & Pick<AskedQuestionWithoutAnswer, 'number' | 'text' | 'options'>
      ) }
    ) | (
      { __typename?: 'QuizFinished' }
      & Pick<QuizFinished, 'quizId' | 'status'>
      & { marks: Array<(
        { __typename?: 'PlayerMarks' }
        & Pick<PlayerMarks, 'playerName' | 'quizTotal'>
        & { rounds: Array<(
          { __typename?: 'PlayerMarksForRound' }
          & Pick<PlayerMarksForRound, 'marks' | 'roundTotal'>
        )> }
      )> }
    ) | (
      { __typename?: 'QuizNotYetStarted' }
      & Pick<QuizNotYetStarted, 'quizId' | 'status'>
    ) | (
      { __typename?: 'RoundFinished' }
      & Pick<RoundFinished, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) | (
      { __typename?: 'RoundMarked' }
      & Pick<RoundMarked, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ), marks: Array<(
        { __typename?: 'PlayerMarks' }
        & Pick<PlayerMarks, 'playerName' | 'quizTotal'>
        & { rounds: Array<(
          { __typename?: 'PlayerMarksForRound' }
          & Pick<PlayerMarksForRound, 'marks' | 'roundTotal'>
        )> }
      )> }
    ) | (
      { __typename?: 'RoundStarted' }
      & Pick<RoundStarted, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) }
  ) }
);

export type GenerateRandomQuizMutationVariables = Exact<{
  input: GenerateRandomQuizInput;
}>;


export type GenerateRandomQuizMutation = (
  { __typename?: 'Mutation' }
  & { generateRandomQuiz: (
    { __typename?: 'QuizGenerated' }
    & Pick<QuizGenerated, 'quizId' | 'quizName'>
  ) }
);

export type SaveQuizMutationVariables = Exact<{
  input: SaveQuizInput;
}>;


export type SaveQuizMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveQuiz'>
);

export type JoinQuizMutationVariables = Exact<{
  input: JoinQuizInput;
}>;


export type JoinQuizMutation = (
  { __typename?: 'Mutation' }
  & { joinQuiz: (
    { __typename?: 'PlayerJoined' }
    & Pick<PlayerJoined, 'quizId' | 'playerName'>
  ) }
);

export type SubmitAnswersMutationVariables = Exact<{
  input: SubmitAnswersInput;
}>;


export type SubmitAnswersMutation = (
  { __typename?: 'Mutation' }
  & { submitAnswers: (
    { __typename?: 'PlayerSubmittedAnswers' }
    & Pick<PlayerSubmittedAnswers, 'quizId' | 'playerName'>
  ) }
);

export type SubmitMarksMutationVariables = Exact<{
  input: SubmitMarksInput;
}>;


export type SubmitMarksMutation = (
  { __typename?: 'Mutation' }
  & { submitMarks: (
    { __typename?: 'PlayerSubmittedMarks' }
    & Pick<PlayerSubmittedMarks, 'quizId' | 'playerName'>
  ) }
);

export type NextQuizStateMutationVariables = Exact<{
  input: NextQuizStateInput;
}>;


export type NextQuizStateMutation = (
  { __typename?: 'Mutation' }
  & { nextQuizState: (
    { __typename?: 'QuestionAnswered' }
    & Pick<QuestionAnswered, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ), question: (
      { __typename?: 'AskedQuestionWithAnswer' }
      & Pick<AskedQuestionWithAnswer, 'number' | 'text' | 'options' | 'answer'>
    ) }
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ), question: (
      { __typename?: 'AskedQuestionWithoutAnswer' }
      & Pick<AskedQuestionWithoutAnswer, 'number' | 'text' | 'options'>
    ) }
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
    & { marks: Array<(
      { __typename?: 'PlayerMarks' }
      & Pick<PlayerMarks, 'playerName' | 'quizTotal'>
      & { rounds: Array<(
        { __typename?: 'PlayerMarksForRound' }
        & Pick<PlayerMarksForRound, 'marks' | 'roundTotal'>
      )> }
    )> }
  ) | (
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'RoundMarked' }
    & Pick<RoundMarked, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ), marks: Array<(
      { __typename?: 'PlayerMarks' }
      & Pick<PlayerMarks, 'playerName' | 'quizTotal'>
      & { rounds: Array<(
        { __typename?: 'PlayerMarksForRound' }
        & Pick<PlayerMarksForRound, 'marks' | 'roundTotal'>
      )> }
    )> }
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) }
);

export type PlayerJoinedSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type PlayerJoinedSubscription = (
  { __typename?: 'Subscription' }
  & { playerJoined?: Maybe<(
    { __typename?: 'PlayerJoined' }
    & Pick<PlayerJoined, 'quizId' | 'playerName'>
  )> }
);

export type PlayerSubmittedAnswersSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type PlayerSubmittedAnswersSubscription = (
  { __typename?: 'Subscription' }
  & { playerSubmittedAnswers?: Maybe<(
    { __typename?: 'PlayerSubmittedAnswers' }
    & Pick<PlayerSubmittedAnswers, 'quizId' | 'playerName'>
  )> }
);

export type PlayerSubmittedMarksSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type PlayerSubmittedMarksSubscription = (
  { __typename?: 'Subscription' }
  & { playerSubmittedMarks?: Maybe<(
    { __typename?: 'PlayerSubmittedMarks' }
    & Pick<PlayerSubmittedMarks, 'quizId' | 'playerName'>
  )> }
);

export type QuizStateSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type QuizStateSubscription = (
  { __typename?: 'Subscription' }
  & { nextQuizState?: Maybe<(
    { __typename?: 'QuestionAnswered' }
    & Pick<QuestionAnswered, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ), question: (
      { __typename?: 'AskedQuestionWithAnswer' }
      & Pick<AskedQuestionWithAnswer, 'number' | 'text' | 'options' | 'answer'>
    ) }
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ), question: (
      { __typename?: 'AskedQuestionWithoutAnswer' }
      & Pick<AskedQuestionWithoutAnswer, 'number' | 'text' | 'options'>
    ) }
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
    & { marks: Array<(
      { __typename?: 'PlayerMarks' }
      & Pick<PlayerMarks, 'playerName' | 'quizTotal'>
      & { rounds: Array<(
        { __typename?: 'PlayerMarksForRound' }
        & Pick<PlayerMarksForRound, 'marks' | 'roundTotal'>
      )> }
    )> }
  ) | (
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'RoundMarked' }
    & Pick<RoundMarked, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ), marks: Array<(
      { __typename?: 'PlayerMarks' }
      & Pick<PlayerMarks, 'playerName' | 'quizTotal'>
      & { rounds: Array<(
        { __typename?: 'PlayerMarksForRound' }
        & Pick<PlayerMarksForRound, 'marks' | 'roundTotal'>
      )> }
    )> }
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  )> }
);


export const QuizzesDocument = gql`
    query Quizzes {
  quizzes {
    quizId
    quizName
    rounds {
      roundName
      questions {
        text
        options
        answer
      }
    }
  }
}
    `;

/**
 * __useQuizzesQuery__
 *
 * To run a query within a React component, call `useQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizzesQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuizzesQuery(baseOptions?: Apollo.QueryHookOptions<QuizzesQuery, QuizzesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizzesQuery, QuizzesQueryVariables>(QuizzesDocument, options);
      }
export function useQuizzesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizzesQuery, QuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizzesQuery, QuizzesQueryVariables>(QuizzesDocument, options);
        }
export type QuizzesQueryHookResult = ReturnType<typeof useQuizzesQuery>;
export type QuizzesLazyQueryHookResult = ReturnType<typeof useQuizzesLazyQuery>;
export type QuizzesQueryResult = Apollo.QueryResult<QuizzesQuery, QuizzesQueryVariables>;
export const QuizSummaryDocument = gql`
    query QuizSummary($quizId: ID!) {
  quizSummary(quizId: $quizId) {
    quizId
    quizName
    playerNames
    players {
      name
      status
    }
    currentRound {
      ... on AskedQuestionWithoutAnswer {
        number
        text
        options
      }
      ... on AskedQuestionWithAnswer {
        number
        text
        options
        answer
      }
    }
    state {
      quizId
      status
      ... on RoundStarted {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
      }
      ... on QuestionAsked {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
        question {
          number
          text
          options
        }
      }
      ... on RoundFinished {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
      }
      ... on QuestionAnswered {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
        question {
          number
          text
          options
          answer
        }
      }
      ... on RoundMarked {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
        }
        marks {
          playerName
          rounds {
            marks
            roundTotal
          }
          quizTotal
        }
      }
      ... on QuizFinished {
        marks {
          playerName
          rounds {
            marks
            roundTotal
          }
          quizTotal
        }
      }
    }
  }
}
    `;

/**
 * __useQuizSummaryQuery__
 *
 * To run a query within a React component, call `useQuizSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizSummaryQuery({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useQuizSummaryQuery(baseOptions: Apollo.QueryHookOptions<QuizSummaryQuery, QuizSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizSummaryQuery, QuizSummaryQueryVariables>(QuizSummaryDocument, options);
      }
export function useQuizSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizSummaryQuery, QuizSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizSummaryQuery, QuizSummaryQueryVariables>(QuizSummaryDocument, options);
        }
export type QuizSummaryQueryHookResult = ReturnType<typeof useQuizSummaryQuery>;
export type QuizSummaryLazyQueryHookResult = ReturnType<typeof useQuizSummaryLazyQuery>;
export type QuizSummaryQueryResult = Apollo.QueryResult<QuizSummaryQuery, QuizSummaryQueryVariables>;
export const GenerateRandomQuizDocument = gql`
    mutation GenerateRandomQuiz($input: GenerateRandomQuizInput!) {
  generateRandomQuiz(input: $input) {
    quizId
    quizName
  }
}
    `;
export type GenerateRandomQuizMutationFn = Apollo.MutationFunction<GenerateRandomQuizMutation, GenerateRandomQuizMutationVariables>;

/**
 * __useGenerateRandomQuizMutation__
 *
 * To run a mutation, you first call `useGenerateRandomQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateRandomQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateRandomQuizMutation, { data, loading, error }] = useGenerateRandomQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateRandomQuizMutation(baseOptions?: Apollo.MutationHookOptions<GenerateRandomQuizMutation, GenerateRandomQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateRandomQuizMutation, GenerateRandomQuizMutationVariables>(GenerateRandomQuizDocument, options);
      }
export type GenerateRandomQuizMutationHookResult = ReturnType<typeof useGenerateRandomQuizMutation>;
export type GenerateRandomQuizMutationResult = Apollo.MutationResult<GenerateRandomQuizMutation>;
export type GenerateRandomQuizMutationOptions = Apollo.BaseMutationOptions<GenerateRandomQuizMutation, GenerateRandomQuizMutationVariables>;
export const SaveQuizDocument = gql`
    mutation SaveQuiz($input: SaveQuizInput!) {
  saveQuiz(input: $input)
}
    `;
export type SaveQuizMutationFn = Apollo.MutationFunction<SaveQuizMutation, SaveQuizMutationVariables>;

/**
 * __useSaveQuizMutation__
 *
 * To run a mutation, you first call `useSaveQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveQuizMutation, { data, loading, error }] = useSaveQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveQuizMutation(baseOptions?: Apollo.MutationHookOptions<SaveQuizMutation, SaveQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveQuizMutation, SaveQuizMutationVariables>(SaveQuizDocument, options);
      }
export type SaveQuizMutationHookResult = ReturnType<typeof useSaveQuizMutation>;
export type SaveQuizMutationResult = Apollo.MutationResult<SaveQuizMutation>;
export type SaveQuizMutationOptions = Apollo.BaseMutationOptions<SaveQuizMutation, SaveQuizMutationVariables>;
export const JoinQuizDocument = gql`
    mutation JoinQuiz($input: JoinQuizInput!) {
  joinQuiz(input: $input) {
    quizId
    playerName
  }
}
    `;
export type JoinQuizMutationFn = Apollo.MutationFunction<JoinQuizMutation, JoinQuizMutationVariables>;

/**
 * __useJoinQuizMutation__
 *
 * To run a mutation, you first call `useJoinQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinQuizMutation, { data, loading, error }] = useJoinQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinQuizMutation(baseOptions?: Apollo.MutationHookOptions<JoinQuizMutation, JoinQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinQuizMutation, JoinQuizMutationVariables>(JoinQuizDocument, options);
      }
export type JoinQuizMutationHookResult = ReturnType<typeof useJoinQuizMutation>;
export type JoinQuizMutationResult = Apollo.MutationResult<JoinQuizMutation>;
export type JoinQuizMutationOptions = Apollo.BaseMutationOptions<JoinQuizMutation, JoinQuizMutationVariables>;
export const SubmitAnswersDocument = gql`
    mutation SubmitAnswers($input: SubmitAnswersInput!) {
  submitAnswers(input: $input) {
    quizId
    playerName
  }
}
    `;
export type SubmitAnswersMutationFn = Apollo.MutationFunction<SubmitAnswersMutation, SubmitAnswersMutationVariables>;

/**
 * __useSubmitAnswersMutation__
 *
 * To run a mutation, you first call `useSubmitAnswersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAnswersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAnswersMutation, { data, loading, error }] = useSubmitAnswersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitAnswersMutation(baseOptions?: Apollo.MutationHookOptions<SubmitAnswersMutation, SubmitAnswersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitAnswersMutation, SubmitAnswersMutationVariables>(SubmitAnswersDocument, options);
      }
export type SubmitAnswersMutationHookResult = ReturnType<typeof useSubmitAnswersMutation>;
export type SubmitAnswersMutationResult = Apollo.MutationResult<SubmitAnswersMutation>;
export type SubmitAnswersMutationOptions = Apollo.BaseMutationOptions<SubmitAnswersMutation, SubmitAnswersMutationVariables>;
export const SubmitMarksDocument = gql`
    mutation SubmitMarks($input: SubmitMarksInput!) {
  submitMarks(input: $input) {
    quizId
    playerName
  }
}
    `;
export type SubmitMarksMutationFn = Apollo.MutationFunction<SubmitMarksMutation, SubmitMarksMutationVariables>;

/**
 * __useSubmitMarksMutation__
 *
 * To run a mutation, you first call `useSubmitMarksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitMarksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitMarksMutation, { data, loading, error }] = useSubmitMarksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitMarksMutation(baseOptions?: Apollo.MutationHookOptions<SubmitMarksMutation, SubmitMarksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitMarksMutation, SubmitMarksMutationVariables>(SubmitMarksDocument, options);
      }
export type SubmitMarksMutationHookResult = ReturnType<typeof useSubmitMarksMutation>;
export type SubmitMarksMutationResult = Apollo.MutationResult<SubmitMarksMutation>;
export type SubmitMarksMutationOptions = Apollo.BaseMutationOptions<SubmitMarksMutation, SubmitMarksMutationVariables>;
export const NextQuizStateDocument = gql`
    mutation NextQuizState($input: NextQuizStateInput!) {
  nextQuizState(input: $input) {
    quizId
    status
    ... on RoundStarted {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
    ... on QuestionAsked {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      question {
        number
        text
        options
      }
    }
    ... on RoundFinished {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
    ... on QuestionAnswered {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      question {
        number
        text
        options
        answer
      }
    }
    ... on RoundMarked {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      marks {
        playerName
        rounds {
          marks
          roundTotal
        }
        quizTotal
      }
    }
    ... on QuizFinished {
      marks {
        playerName
        rounds {
          marks
          roundTotal
        }
        quizTotal
      }
    }
  }
}
    `;
export type NextQuizStateMutationFn = Apollo.MutationFunction<NextQuizStateMutation, NextQuizStateMutationVariables>;

/**
 * __useNextQuizStateMutation__
 *
 * To run a mutation, you first call `useNextQuizStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNextQuizStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nextQuizStateMutation, { data, loading, error }] = useNextQuizStateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNextQuizStateMutation(baseOptions?: Apollo.MutationHookOptions<NextQuizStateMutation, NextQuizStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NextQuizStateMutation, NextQuizStateMutationVariables>(NextQuizStateDocument, options);
      }
export type NextQuizStateMutationHookResult = ReturnType<typeof useNextQuizStateMutation>;
export type NextQuizStateMutationResult = Apollo.MutationResult<NextQuizStateMutation>;
export type NextQuizStateMutationOptions = Apollo.BaseMutationOptions<NextQuizStateMutation, NextQuizStateMutationVariables>;
export const PlayerJoinedDocument = gql`
    subscription PlayerJoined($quizId: ID!) {
  playerJoined(quizId: $quizId) {
    quizId
    playerName
  }
}
    `;

/**
 * __usePlayerJoinedSubscription__
 *
 * To run a query within a React component, call `usePlayerJoinedSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlayerJoinedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerJoinedSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function usePlayerJoinedSubscription(baseOptions: Apollo.SubscriptionHookOptions<PlayerJoinedSubscription, PlayerJoinedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PlayerJoinedSubscription, PlayerJoinedSubscriptionVariables>(PlayerJoinedDocument, options);
      }
export type PlayerJoinedSubscriptionHookResult = ReturnType<typeof usePlayerJoinedSubscription>;
export type PlayerJoinedSubscriptionResult = Apollo.SubscriptionResult<PlayerJoinedSubscription>;
export const PlayerSubmittedAnswersDocument = gql`
    subscription PlayerSubmittedAnswers($quizId: ID!) {
  playerSubmittedAnswers(quizId: $quizId) {
    quizId
    playerName
  }
}
    `;

/**
 * __usePlayerSubmittedAnswersSubscription__
 *
 * To run a query within a React component, call `usePlayerSubmittedAnswersSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlayerSubmittedAnswersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerSubmittedAnswersSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function usePlayerSubmittedAnswersSubscription(baseOptions: Apollo.SubscriptionHookOptions<PlayerSubmittedAnswersSubscription, PlayerSubmittedAnswersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PlayerSubmittedAnswersSubscription, PlayerSubmittedAnswersSubscriptionVariables>(PlayerSubmittedAnswersDocument, options);
      }
export type PlayerSubmittedAnswersSubscriptionHookResult = ReturnType<typeof usePlayerSubmittedAnswersSubscription>;
export type PlayerSubmittedAnswersSubscriptionResult = Apollo.SubscriptionResult<PlayerSubmittedAnswersSubscription>;
export const PlayerSubmittedMarksDocument = gql`
    subscription PlayerSubmittedMarks($quizId: ID!) {
  playerSubmittedMarks(quizId: $quizId) {
    quizId
    playerName
  }
}
    `;

/**
 * __usePlayerSubmittedMarksSubscription__
 *
 * To run a query within a React component, call `usePlayerSubmittedMarksSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlayerSubmittedMarksSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerSubmittedMarksSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function usePlayerSubmittedMarksSubscription(baseOptions: Apollo.SubscriptionHookOptions<PlayerSubmittedMarksSubscription, PlayerSubmittedMarksSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PlayerSubmittedMarksSubscription, PlayerSubmittedMarksSubscriptionVariables>(PlayerSubmittedMarksDocument, options);
      }
export type PlayerSubmittedMarksSubscriptionHookResult = ReturnType<typeof usePlayerSubmittedMarksSubscription>;
export type PlayerSubmittedMarksSubscriptionResult = Apollo.SubscriptionResult<PlayerSubmittedMarksSubscription>;
export const QuizStateDocument = gql`
    subscription QuizState($quizId: ID!) {
  nextQuizState(quizId: $quizId) {
    quizId
    status
    ... on RoundStarted {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
    ... on QuestionAsked {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      question {
        number
        text
        options
      }
    }
    ... on RoundFinished {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
    ... on QuestionAnswered {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      question {
        number
        text
        options
        answer
      }
    }
    ... on RoundFinished {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
    ... on RoundMarked {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
      }
      marks {
        playerName
        rounds {
          marks
          roundTotal
        }
        quizTotal
      }
    }
    ... on QuizFinished {
      marks {
        playerName
        rounds {
          marks
          roundTotal
        }
        quizTotal
      }
    }
  }
}
    `;

/**
 * __useQuizStateSubscription__
 *
 * To run a query within a React component, call `useQuizStateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useQuizStateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizStateSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useQuizStateSubscription(baseOptions: Apollo.SubscriptionHookOptions<QuizStateSubscription, QuizStateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<QuizStateSubscription, QuizStateSubscriptionVariables>(QuizStateDocument, options);
      }
export type QuizStateSubscriptionHookResult = ReturnType<typeof useQuizStateSubscription>;
export type QuizStateSubscriptionResult = Apollo.SubscriptionResult<QuizStateSubscription>;