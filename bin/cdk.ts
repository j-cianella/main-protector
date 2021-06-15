#!/usr/bin/env node
import * as dotenv from 'dotenv';
dotenv.config();
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MainProtectorStack } from '../cdk/main-protector';

dotenv.config({ path: __dirname + '/.env' });

const app = new cdk.App();
const mainProtectorStack = new MainProtectorStack(app, 'MainProtectorStack');

cdk.Tags.of(mainProtectorStack).add('App', 'main-protector');
