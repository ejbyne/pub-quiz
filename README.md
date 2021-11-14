# The Online Pub Quiz

## Introduction

During the Corona pandemic I wanted to play online quizzes with my friends and family
but was unable to find one which felt like a real pub quiz, where the host can reveal
questions and answers in real time. So I decided to build one!

Real-time communication between the backend and clients is enabled using GraphQL
subscriptions.

## Technologies used

This project is a yarn workspace comprising four packages:

### Backend

The serverless backend was built using AWS AppSync, Lambda, DynamoDB and Cognito.

This package contains the CDK code to provision the infrastructure and also the source
code for the lambdas used by the GraphQL API.

### Web app

This was built using React and Typescript. The package mainly contains UI components with the
frontend domain logic being contained in the shared package (see below). 

### Mobile app

This is a React Native app which currently only contains very limited functionality!

### Shared

This package contains the frontend code for integrating the GraphQL API and the frontend
domain logic. It is intended to be shared by both the web app and mobile app.
