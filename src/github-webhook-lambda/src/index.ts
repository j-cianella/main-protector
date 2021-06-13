import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { verify } from '@octokit/webhooks-methods';
import { RepositoryEvent } from '@octokit/webhooks-types';

function validateWebhookCall(signature: string, webhookPayload: any) {
  if (!signature) {
    console.error("Github event doesn't have signature. This webhook requires a secret to be configured.");
    return false;
  }

  const secret = process.env.GITHUB_APP_WEBHOOK_SECRET || '';

  if (!secret) {
    console.error('Webhook Secret not available in environment variable');
    return false;
  }

  if (!verify(secret, webhookPayload, signature)) {
    console.error('Unable to verify signature!');
    return false;
  }
  return true;
}

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  console.log('Dump of API Proxy Event', event);
  const headers = event.headers;

  for (const key in headers) {
    headers[key.toLowerCase()] = headers[key];
  }

  const webhookPayload = event.body! as any;
  const signature = headers['x-hub-signature'] as string;

  const isValidWebhookCall = validateWebhookCall(signature, webhookPayload);

  if (!isValidWebhookCall) {
    return {
      statusCode: 500,
    };
  }

  const githubEvent = headers['x-github-event'] as string;

  if (githubEvent === 'repository') {
    const body = JSON.parse(webhookPayload) as RepositoryEvent;

    let installationId = body.installation?.id;
    if (installationId == null) {
      installationId = 0;
    }
    console.log(`Installation ID: ${installationId}`);

    if (body.action === 'created') {
      console.log(`A new Repo was created with name: ${body.repository.name}`);
    }
  }

  return {
    body: JSON.stringify({ message: 'Successful lambda invocation' }),
    statusCode: 200,
  };
}
