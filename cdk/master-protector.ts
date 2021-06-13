import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaNode from '@aws-cdk/aws-lambda-nodejs';

export class MasterProtectorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const githubWebhookFunction = new lambdaNode.NodejsFunction(this, 'github-webhook-function', {
      functionName: 'master-protector-github-webhook-function',
      memorySize: 1024,
      entry: './src/github-webhook-lambda/src/index.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(15),
      environment: {
        GITHUB_APP_WEBHOOK_SECRET: process.env.GITHUB_APP_WEBHOOK_SECRET || '',
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
