import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type JoinQuizInput = {
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  saveQuiz: Scalars['Boolean'];
  joinQuiz: PlayerJoined;
  nextQuizState: QuizState;
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

export type NextQuizStateInput = {
  quizId: Scalars['ID'];
};

export type PlayerJoined = {
  __typename?: 'PlayerJoined';
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  quizSummary: QuizSummary;
};


export type QueryQuizSummaryArgs = {
  quizId: Scalars['ID'];
};

export type QuestionAsked = QuizState & {
  __typename?: 'QuestionAsked';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundNumber: Scalars['Int'];
  questionNumber: Scalars['Int'];
  questionText: Scalars['String'];
};

export type QuestionInput = {
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type QuizFinished = QuizState & {
  __typename?: 'QuizFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
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
  QuizFinished = 'QUIZ_FINISHED'
}

export type QuizSummary = {
  __typename?: 'QuizSummary';
  quizId: Scalars['ID'];
  quizName: Scalars['String'];
  playerNames?: Maybe<Array<Scalars['String']>>;
  state: QuizState;
};

export type RoundFinished = QuizState & {
  __typename?: 'RoundFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundNumber: Scalars['Int'];
  roundName: Scalars['String'];
  numberOfQuestions: Scalars['Int'];
};

export type RoundInput = {
  roundName: Scalars['String'];
  questions: Array<QuestionInput>;
};

export type RoundStarted = QuizState & {
  __typename?: 'RoundStarted';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundNumber: Scalars['Int'];
  roundName: Scalars['String'];
  numberOfQuestions: Scalars['Int'];
};

export type SaveQuizInput = {
  quizName: Scalars['String'];
  rounds: Array<RoundInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  playerJoined?: Maybe<PlayerJoined>;
  nextQuizState?: Maybe<QuizState>;
};


export type SubscriptionPlayerJoinedArgs = {
  quizId: Scalars['ID'];
};


export type SubscriptionNextQuizStateArgs = {
  quizId: Scalars['ID'];
};

export type QuizSummaryQueryQueryVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type QuizSummaryQueryQuery = (
  { __typename?: 'Query' }
  & { quizSummary: (
    { __typename?: 'QuizSummary' }
    & Pick<QuizSummary, 'quizId' | 'quizName' | 'playerNames'>
    & { state: (
      { __typename?: 'QuizNotYetStarted' }
      & Pick<QuizNotYetStarted, 'quizId' | 'status'>
    ) | (
      { __typename?: 'RoundStarted' }
      & Pick<RoundStarted, 'roundNumber' | 'roundName' | 'numberOfQuestions' | 'quizId' | 'status'>
    ) | (
      { __typename?: 'QuestionAsked' }
      & Pick<QuestionAsked, 'roundNumber' | 'questionNumber' | 'questionText' | 'quizId' | 'status'>
    ) | (
      { __typename?: 'RoundFinished' }
      & Pick<RoundFinished, 'roundNumber' | 'roundName' | 'numberOfQuestions' | 'quizId' | 'status'>
    ) | (
      { __typename?: 'QuizFinished' }
      & Pick<QuizFinished, 'quizId' | 'status'>
    ) }
  ) }
);

export type SaveQuizMutationMutationVariables = Exact<{
  input: SaveQuizInput;
}>;


export type SaveQuizMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveQuiz'>
);

export type JoinQuizMutationMutationVariables = Exact<{
  input: JoinQuizInput;
}>;


export type JoinQuizMutationMutation = (
  { __typename?: 'Mutation' }
  & { joinQuiz: (
    { __typename?: 'PlayerJoined' }
    & Pick<PlayerJoined, 'quizId' | 'playerName'>
  ) }
);

export type NextQuizStateMutationMutationVariables = Exact<{
  input: NextQuizStateInput;
}>;


export type NextQuizStateMutationMutation = (
  { __typename?: 'Mutation' }
  & { nextQuizState: (
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'roundNumber' | 'roundName' | 'numberOfQuestions' | 'quizId' | 'status'>
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'roundNumber' | 'questionNumber' | 'questionText' | 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'roundNumber' | 'roundName' | 'numberOfQuestions' | 'quizId' | 'status'>
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
  ) }
);

export type PlayerJoinedSubscriptionSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type PlayerJoinedSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { playerJoined?: Maybe<(
    { __typename?: 'PlayerJoined' }
    & Pick<PlayerJoined, 'quizId' | 'playerName'>
  )> }
);

export type NextQuizStateSubscriptionSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type NextQuizStateSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { nextQuizState?: Maybe<(
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'roundNumber' | 'roundName' | 'numberOfQuestions' | 'quizId' | 'status'>
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'roundNumber' | 'questionNumber' | 'questionText' | 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'roundNumber' | 'roundName' | 'numberOfQuestions' | 'quizId' | 'status'>
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
  )> }
);


export const QuizSummaryQueryDocument = gql`
    query QuizSummaryQuery($quizId: ID!) {
  quizSummary(quizId: $quizId) {
    quizId
    quizName
    playerNames
    state {
      quizId
      status
      ... on RoundStarted {
        roundNumber
        roundName
        numberOfQuestions
      }
      ... on QuestionAsked {
        roundNumber
        questionNumber
        questionText
      }
      ... on RoundFinished {
        roundNumber
        roundName
        numberOfQuestions
      }
    }
  }
}
    `;

/**
 * __useQuizSummaryQueryQuery__
 *
 * To run a query within a React component, call `useQuizSummaryQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizSummaryQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizSummaryQueryQuery({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useQuizSummaryQueryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QuizSummaryQueryQuery, QuizSummaryQueryQueryVariables>) {
        return ApolloReactHooks.useQuery<QuizSummaryQueryQuery, QuizSummaryQueryQueryVariables>(QuizSummaryQueryDocument, baseOptions);
      }
export function useQuizSummaryQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QuizSummaryQueryQuery, QuizSummaryQueryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<QuizSummaryQueryQuery, QuizSummaryQueryQueryVariables>(QuizSummaryQueryDocument, baseOptions);
        }
export type QuizSummaryQueryQueryHookResult = ReturnType<typeof useQuizSummaryQueryQuery>;
export type QuizSummaryQueryLazyQueryHookResult = ReturnType<typeof useQuizSummaryQueryLazyQuery>;
export type QuizSummaryQueryQueryResult = ApolloReactCommon.QueryResult<QuizSummaryQueryQuery, QuizSummaryQueryQueryVariables>;
export const SaveQuizMutationDocument = gql`
    mutation SaveQuizMutation($input: SaveQuizInput!) {
  saveQuiz(input: $input)
}
    `;
export type SaveQuizMutationMutationFn = ApolloReactCommon.MutationFunction<SaveQuizMutationMutation, SaveQuizMutationMutationVariables>;

/**
 * __useSaveQuizMutationMutation__
 *
 * To run a mutation, you first call `useSaveQuizMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveQuizMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveQuizMutationMutation, { data, loading, error }] = useSaveQuizMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveQuizMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveQuizMutationMutation, SaveQuizMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveQuizMutationMutation, SaveQuizMutationMutationVariables>(SaveQuizMutationDocument, baseOptions);
      }
export type SaveQuizMutationMutationHookResult = ReturnType<typeof useSaveQuizMutationMutation>;
export type SaveQuizMutationMutationResult = ApolloReactCommon.MutationResult<SaveQuizMutationMutation>;
export type SaveQuizMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveQuizMutationMutation, SaveQuizMutationMutationVariables>;
export const JoinQuizMutationDocument = gql`
    mutation JoinQuizMutation($input: JoinQuizInput!) {
  joinQuiz(input: $input) {
    quizId
    playerName
  }
}
    `;
export type JoinQuizMutationMutationFn = ApolloReactCommon.MutationFunction<JoinQuizMutationMutation, JoinQuizMutationMutationVariables>;

/**
 * __useJoinQuizMutationMutation__
 *
 * To run a mutation, you first call `useJoinQuizMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinQuizMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinQuizMutationMutation, { data, loading, error }] = useJoinQuizMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinQuizMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinQuizMutationMutation, JoinQuizMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinQuizMutationMutation, JoinQuizMutationMutationVariables>(JoinQuizMutationDocument, baseOptions);
      }
export type JoinQuizMutationMutationHookResult = ReturnType<typeof useJoinQuizMutationMutation>;
export type JoinQuizMutationMutationResult = ApolloReactCommon.MutationResult<JoinQuizMutationMutation>;
export type JoinQuizMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinQuizMutationMutation, JoinQuizMutationMutationVariables>;
export const NextQuizStateMutationDocument = gql`
    mutation NextQuizStateMutation($input: NextQuizStateInput!) {
  nextQuizState(input: $input) {
    quizId
    status
    ... on RoundStarted {
      roundNumber
      roundName
      numberOfQuestions
    }
    ... on QuestionAsked {
      roundNumber
      questionNumber
      questionText
    }
    ... on RoundFinished {
      roundNumber
      roundName
      numberOfQuestions
    }
  }
}
    `;
export type NextQuizStateMutationMutationFn = ApolloReactCommon.MutationFunction<NextQuizStateMutationMutation, NextQuizStateMutationMutationVariables>;

/**
 * __useNextQuizStateMutationMutation__
 *
 * To run a mutation, you first call `useNextQuizStateMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNextQuizStateMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nextQuizStateMutationMutation, { data, loading, error }] = useNextQuizStateMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNextQuizStateMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NextQuizStateMutationMutation, NextQuizStateMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<NextQuizStateMutationMutation, NextQuizStateMutationMutationVariables>(NextQuizStateMutationDocument, baseOptions);
      }
export type NextQuizStateMutationMutationHookResult = ReturnType<typeof useNextQuizStateMutationMutation>;
export type NextQuizStateMutationMutationResult = ApolloReactCommon.MutationResult<NextQuizStateMutationMutation>;
export type NextQuizStateMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<NextQuizStateMutationMutation, NextQuizStateMutationMutationVariables>;
export const PlayerJoinedSubscriptionDocument = gql`
    subscription PlayerJoinedSubscription($quizId: ID!) {
  playerJoined(quizId: $quizId) {
    quizId
    playerName
  }
}
    `;

/**
 * __usePlayerJoinedSubscriptionSubscription__
 *
 * To run a query within a React component, call `usePlayerJoinedSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePlayerJoinedSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlayerJoinedSubscriptionSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function usePlayerJoinedSubscriptionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<PlayerJoinedSubscriptionSubscription, PlayerJoinedSubscriptionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<PlayerJoinedSubscriptionSubscription, PlayerJoinedSubscriptionSubscriptionVariables>(PlayerJoinedSubscriptionDocument, baseOptions);
      }
export type PlayerJoinedSubscriptionSubscriptionHookResult = ReturnType<typeof usePlayerJoinedSubscriptionSubscription>;
export type PlayerJoinedSubscriptionSubscriptionResult = ApolloReactCommon.SubscriptionResult<PlayerJoinedSubscriptionSubscription>;
export const NextQuizStateSubscriptionDocument = gql`
    subscription NextQuizStateSubscription($quizId: ID!) {
  nextQuizState(quizId: $quizId) {
    quizId
    status
    ... on RoundStarted {
      roundNumber
      roundName
      numberOfQuestions
    }
    ... on QuestionAsked {
      roundNumber
      questionNumber
      questionText
    }
    ... on RoundFinished {
      roundNumber
      roundName
      numberOfQuestions
    }
  }
}
    `;

/**
 * __useNextQuizStateSubscriptionSubscription__
 *
 * To run a query within a React component, call `useNextQuizStateSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNextQuizStateSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNextQuizStateSubscriptionSubscription({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useNextQuizStateSubscriptionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NextQuizStateSubscriptionSubscription, NextQuizStateSubscriptionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<NextQuizStateSubscriptionSubscription, NextQuizStateSubscriptionSubscriptionVariables>(NextQuizStateSubscriptionDocument, baseOptions);
      }
export type NextQuizStateSubscriptionSubscriptionHookResult = ReturnType<typeof useNextQuizStateSubscriptionSubscription>;
export type NextQuizStateSubscriptionSubscriptionResult = ApolloReactCommon.SubscriptionResult<NextQuizStateSubscriptionSubscription>;