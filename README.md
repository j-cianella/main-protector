# GitHub Main Protector

## Overview

This project contains a function to automatically set the 'main' branch protection of a repo as soon as it is created. An issue is created in the repo with a notification of the newly changed settings.

### Reusability

This project is reusable and can be a base template where additional webhook events can be subscribed to and acted upon. For those with infrastructure in AWS using this approach, you will be able to run any actions within your VPC, allowing secure network connectivity to your resources.

### Branch Protection Rules

The following branch protection rules are currently enabled but they can be modified to meet organizational requirements:

- Require status checks for 'build' and 'test' actions
- Include administrators in all restrictions
- Require pull request reviews
  - Dismiss stale reviews is enabled
  - Require code owner reviews is enabled

## Configuration

### GitHub App

To set up this process a GitHub App installed at the organization is created. This app is owned by the organiation to allow for direct ownership, without reliance on a specific user.

The following steps detail how to set up the [GitHub App](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app):

1. Go to the oranization settings and select the 'Developer Settings' tab.
2. Select GitHub Apps and click "New GitHub App".
3. Fill in an app name, webhook url and webhook secret.
4. The following permissions will be needed:
   - Repository Permissions:
     - Administration: read and write
     - Issues: read and write
     - Metadata: read only (required)
5. Subscribe to "Repository" events
6. Keep the "Only on this account" setting.
7. Click Create GitHub App
8. Generate and save a private key
9. Install the App in the Organization.

### Environment Variables

The following environment variables are used in the process. They will need to be placed in repository secrets in GitHub and can be used locally in a .env file in the project root. (See node [dotenv](https://www.npmjs.com/package/dotenv) for more information)

Note: These secrets are exposed in the lambda function properties and SSM parameters, SecretsManager, Vault or a similar password store should be used to gather the secrets real-time. For purpose of this demo a private account was use and this was sufficient.

- GITHUB_APP_WEBHOOK_SECRET - The webhook secret added to the app
- GITHUB_APP_ID - The app id from the generated app
- GITHUB_APP_PRIVATE_KEY - The private key as a base64 encoded string
- MAINLINE_BRANCH - Branch to protect, defaulted to 'main'

## Webhook

The GitHub webhook is created at the organization level and is subscribed to "Respositories" events. A webhook secret is used to validate that the message is coming from GitHub.

## Infrastructure

The webhook is hosted on AWS with an API Gateway directing GitHub webhooks to a lambda function. The function uses the octokit class to automatically set the protection of the branch.

Once the protection is set a new issue is created notifing everyone that the protection has been set. A configurable ADMIN_USER environemnt variable is also notified. The issue is set to closed by default.

The AWS Cloud Developmnt Kit (CDK) was used to define infrastructure as code. The use of TypeScript allows for IaC and FaaS allows for strongly typed classes and methods.

## CI/CD

Deployments are done using GitHub Actions using the `cdk deploy` command. IAM credentials allowing lambda, API gateway, cloudformation and IAM access must be setup in secrets within the repo. Note: previous cdk bootstrapping of the AWS environment used is required.

## TODOs

Here are some additional things that would have been done had there been more time to work on this, or to productionize it.

### Automated Testing

The project is already setup to use jest for automated testing.

Due to time constraints, tradeoffs were made to not add unit testing at this time. Due to the use 3rd party libraries, mainly Octokit, mocking would be hte main source of testing which isnt as value add.

Integration tests to validate the settings in the repo after creation would be a nice value add.

### WAF

Setting up a WAF on the API gateway to only allow GitHub CIDR ranges would add an additional layer of security against outside calls.

Note: The [GitHub meta API](https://api.github.com/meta) endpoint will give CIDR ranges for IP origins of Webhook calls.

### Observability

Add more robust logging and collect metrics on the health of this endpoint. Log aggregation tools like Splunk or AWS CloudWatch can collect metrics and proactively alert when there are any errors.

### Compliance Scanning and Reporting

This framework with CDK can be used to add additional lambda functions to call the GitHub API using the same GitHub App that was created (with additional permissions added as needed).

For example a lambda can be created on a cron schedule to look at all repos and verify that the mainline branch is properly protected. Alerting (SNS?) can be triggered for any out of compliance repositories.
