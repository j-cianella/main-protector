# master-protector

Automatically set the protection of the master branch

## Webhook

The GitHub webhook is created at the organization level and is subscribed to "Respositories" events

## Infrastructure

The webhook is hosted on AWS with an API Gateway directing GitHub webhooks to a lambda function.

The AWS Cloud Developmnt Kit (CDK) was used

### CDK Commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Code Quality

### ESLint

### Prettier
