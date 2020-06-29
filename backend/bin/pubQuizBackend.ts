#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PubQuizBackendStack } from '../src/infrastructure/backendStack';

const app = new cdk.App();
new PubQuizBackendStack(app, 'PubQuizBackendStack');
