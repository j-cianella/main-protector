# GitHub Main Protector

This project contains a function to automatically set the 'main' branch protection of a repo as soon as it is created. An issue is created in the repo with a notification of the newly changed settings.

## Configuration

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
- GITHUB_APP_PRIVATE_KEY = The private key as a base64 encoded string
- MAINLINE_BRANCH - Branch to protect, defaulted to 'main'

## Webhook

The GitHub webhook is created at the organization level and is subscribed to "Respositories" events.

## Infrastructure

The webhook is hosted on AWS with an API Gateway directing GitHub webhooks to a lambda function. The function uses the octokit class to automatically set the protection of the branch.

Once the protection is set a new issue is created notifing everyone that the protection has been set. The issue is set to closed

The AWS Cloud Developmnt Kit (CDK) was used to define infrastructure as code. The use of TypeScript allows for IaC and FaaS allows for strongly typed classes and methods.

## Automated Testing

The project is already setup to use jest for automated testing.

Due to time constraints, tradeoffs were made to not add unit testing at this time. Due to the use 3rd party libraries, mainly Octokit,
mocking would be hte main source of testing which isnt as value add.

Integration tests to validate the settings in the repo after creation would be a nice value add.
