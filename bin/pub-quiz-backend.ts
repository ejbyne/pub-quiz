#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PubQuizBackendStack } from '../src/infrastructure/pub-quiz-backend-stack';

const app = new cdk.App();
new PubQuizBackendStack(app, 'PubQuizBackendStack');
