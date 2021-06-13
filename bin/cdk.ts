#!/usr/bin/env node
require('dotenv').config();
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MasterProtectorStack } from '../cdk/master-protector';

const app = new cdk.App();
const masterProtectorStack = new MasterProtectorStack(app, 'MasterProtectorStack');

cdk.Tags.of(masterProtectorStack).add('App', 'master-protector');
