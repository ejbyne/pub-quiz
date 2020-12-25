import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  quizSummary: QuizSummary;
};


export type QueryQuizSummaryArgs = {
  quizId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  generateRandomQuiz: QuizGenerated;
  saveQuiz: Scalars['Boolean'];
  joinQuiz: PlayerJoined;
  nextQuizState: QuizState;
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

export type GenerateRandomQuizInput = {
  quizName: Scalars['String'];
};

export type SaveQuizInput = {
  quizName: Scalars['String'];
  rounds: Array<RoundInput>;
};

export type RoundInput = {
  roundName: Scalars['String'];
  questions: Array<QuestionInput>;
};

export type QuestionInput = {
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type JoinQuizInput = {
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type NextQuizStateInput = {
  quizId: Scalars['ID'];
};

export type QuizGenerated = {
  __typename?: 'QuizGenerated';
  quizId: Scalars['ID'];
  quizName: Scalars['String'];
};

export type QuizSummary = {
  __typename?: 'QuizSummary';
  quizId: Scalars['ID'];
  quizName: Scalars['String'];
  playerNames?: Maybe<Array<Scalars['String']>>;
  state: QuizState;
};

export type RoundSummary = {
  __typename?: 'RoundSummary';
  roundNumber: Scalars['Int'];
  roundName: Scalars['String'];
  numberOfQuestions: Scalars['Int'];
};

export enum QuizStatus {
  QuizNotYetStarted = 'QUIZ_NOT_YET_STARTED',
  RoundStarted = 'ROUND_STARTED',
  QuestionAsked = 'QUESTION_ASKED',
  RoundFinished = 'ROUND_FINISHED',
  QuizFinished = 'QUIZ_FINISHED'
}

export type QuizState = {
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export type QuizNotYetStarted = QuizState & {
  __typename?: 'QuizNotYetStarted';
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export type RoundStarted = QuizState & {
  __typename?: 'RoundStarted';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
};

export type QuestionAsked = QuizState & {
  __typename?: 'QuestionAsked';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
  questionNumber: Scalars['Int'];
  questionText: Scalars['String'];
  questionOptions?: Maybe<Array<Scalars['String']>>;
};

export type RoundFinished = QuizState & {
  __typename?: 'RoundFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
  roundSummary: RoundSummary;
};

export type QuizFinished = QuizState & {
  __typename?: 'QuizFinished';
  quizId: Scalars['ID'];
  status: QuizStatus;
};

export type PlayerJoined = {
  __typename?: 'PlayerJoined';
  quizId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type QuizSummaryQueryVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type QuizSummaryQuery = (
  { __typename?: 'Query' }
  & { quizSummary: (
    { __typename?: 'QuizSummary' }
    & Pick<QuizSummary, 'quizId' | 'quizName' | 'playerNames'>
    & { state: (
      { __typename?: 'QuizNotYetStarted' }
      & Pick<QuizNotYetStarted, 'quizId' | 'status'>
    ) | (
      { __typename?: 'RoundStarted' }
      & Pick<RoundStarted, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) | (
      { __typename?: 'QuestionAsked' }
      & Pick<QuestionAsked, 'questionNumber' | 'questionText' | 'questionOptions' | 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) | (
      { __typename?: 'RoundFinished' }
      & Pick<RoundFinished, 'quizId' | 'status'>
      & { roundSummary: (
        { __typename?: 'RoundSummary' }
        & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
      ) }
    ) | (
      { __typename?: 'QuizFinished' }
      & Pick<QuizFinished, 'quizId' | 'status'>
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

export type NextQuizStateMutationVariables = Exact<{
  input: NextQuizStateInput;
}>;


export type NextQuizStateMutation = (
  { __typename?: 'Mutation' }
  & { nextQuizState: (
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'questionNumber' | 'questionText' | 'questionOptions' | 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
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

export type QuizStateSubscriptionVariables = Exact<{
  quizId: Scalars['ID'];
}>;


export type QuizStateSubscription = (
  { __typename?: 'Subscription' }
  & { nextQuizState?: Maybe<(
    { __typename?: 'QuizNotYetStarted' }
    & Pick<QuizNotYetStarted, 'quizId' | 'status'>
  ) | (
    { __typename?: 'RoundStarted' }
    & Pick<RoundStarted, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuestionAsked' }
    & Pick<QuestionAsked, 'questionNumber' | 'questionText' | 'questionOptions' | 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'RoundFinished' }
    & Pick<RoundFinished, 'quizId' | 'status'>
    & { roundSummary: (
      { __typename?: 'RoundSummary' }
      & Pick<RoundSummary, 'roundNumber' | 'roundName' | 'numberOfQuestions'>
    ) }
  ) | (
    { __typename?: 'QuizFinished' }
    & Pick<QuizFinished, 'quizId' | 'status'>
  )> }
);


export const QuizSummaryDocument = gql`
    query QuizSummary($quizId: ID!) {
  quizSummary(quizId: $quizId) {
    quizId
    quizName
    playerNames
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
        questionNumber
        questionText
        questionOptions
      }
      ... on RoundFinished {
        roundSummary {
          roundNumber
          roundName
          numberOfQuestions
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
        return Apollo.useQuery<QuizSummaryQuery, QuizSummaryQueryVariables>(QuizSummaryDocument, baseOptions);
      }
export function useQuizSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizSummaryQuery, QuizSummaryQueryVariables>) {
          return Apollo.useLazyQuery<QuizSummaryQuery, QuizSummaryQueryVariables>(QuizSummaryDocument, baseOptions);
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
        return Apollo.useMutation<GenerateRandomQuizMutation, GenerateRandomQuizMutationVariables>(GenerateRandomQuizDocument, baseOptions);
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
        return Apollo.useMutation<SaveQuizMutation, SaveQuizMutationVariables>(SaveQuizDocument, baseOptions);
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
        return Apollo.useMutation<JoinQuizMutation, JoinQuizMutationVariables>(JoinQuizDocument, baseOptions);
      }
export type JoinQuizMutationHookResult = ReturnType<typeof useJoinQuizMutation>;
export type JoinQuizMutationResult = Apollo.MutationResult<JoinQuizMutation>;
export type JoinQuizMutationOptions = Apollo.BaseMutationOptions<JoinQuizMutation, JoinQuizMutationVariables>;
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
      questionNumber
      questionText
      questionOptions
    }
    ... on RoundFinished {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
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
        return Apollo.useMutation<NextQuizStateMutation, NextQuizStateMutationVariables>(NextQuizStateDocument, baseOptions);
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
        return Apollo.useSubscription<PlayerJoinedSubscription, PlayerJoinedSubscriptionVariables>(PlayerJoinedDocument, baseOptions);
      }
export type PlayerJoinedSubscriptionHookResult = ReturnType<typeof usePlayerJoinedSubscription>;
export type PlayerJoinedSubscriptionResult = Apollo.SubscriptionResult<PlayerJoinedSubscription>;
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
      questionNumber
      questionText
      questionOptions
    }
    ... on RoundFinished {
      roundSummary {
        roundNumber
        roundName
        numberOfQuestions
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
        return Apollo.useSubscription<QuizStateSubscription, QuizStateSubscriptionVariables>(QuizStateDocument, baseOptions);
      }
export type QuizStateSubscriptionHookResult = ReturnType<typeof useQuizStateSubscription>;
export type QuizStateSubscriptionResult = Apollo.SubscriptionResult<QuizStateSubscription>;