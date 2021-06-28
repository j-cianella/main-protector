import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaNode from '@aws-cdk/aws-lambda-nodejs';

export class MainProtectorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const githubWebhookFunction = new lambdaNode.NodejsFunction(this, 'github-webhook-function', {
      functionName: 'main-protector-github-webhook-function',
      memorySize: 1024,
      entry: './src/github-webhook-lambda/src/index.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(15),
      environment: {
        GH_APP_WEBHOOK_SECRET: process.env.GH_APP_WEBHOOK_SECRET || '',
        GH_APP_ID: process.env.GH_APP_ID || '',
        GH_APP_PRIVATE_KEY: process.env.GH_APP_PRIVATE_KEY || '',
        MAINLINE_BRANCH: 'main',
        ADMIN_USER: 'jcianella',
      },
    });

    const apiRest = new apigw.RestApi(this, 'github-action-webhook', {
      restApiName: `githubaction-webhook-API`,
      description: 'HTTP endpoint for GitHub to call with webhook events',
      deployOptions: {
        stageName: 'prod',
      },
    });

    apiRest.root.addResource('webhook').addMethod('POST', new apigw.LambdaIntegration(githubWebhookFunction));
  }
}
