import { Octokit } from '@octokit/rest';
import { createAppAuth } from '@octokit/auth-app';

export async function setBranchProtection(
  mainlineBranch: string,
  repo: string,
  owner: string,
  installationId: number
): Promise<void> {
  console.log(
    `Creating new app auth with branch: ${mainlineBranch} repo: ${repo} owner: ${owner} ` +
      `for installationId: ${installationId}`
  );

  try {
    const privateKey = Buffer.from(process.env.GH_APP_PRIVATE_KEY || '', 'base64').toString();
    const octokit = new Octokit({
      authStrategy: createAppAuth,
      auth: {
        appId: process.env.GH_APP_ID,
        privateKey,
        installationId: installationId,
      },
    });

    console.log('Updating branch protections');
    //TODO: parameterize these protections
    await octokit.repos.updateBranchProtection({
      branch: mainlineBranch,
      owner,
      repo,
      required_status_checks: {
        strict: true,
        contexts: ['build', 'test'],
      },
      enforce_admins: true,
      required_pull_request_reviews: {
        dismissal_restrictions: {},
        dismiss_stale_reviews: true,
        require_code_owner_reviews: true,
      },
      restrictions: null,
    });

    console.log('Creating new Issue notifying user of protection updates');
    await octokit.issues.create({
      owner,
      repo,
      title: `Branch protections have been updated for '${mainlineBranch}' branch`,
      body:
        `Users will not be able to push directly to the ${mainlineBranch} branch.\n` +
        `At least 1 review will be required to merge to ${mainlineBranch}\n` +
        `Administrators are asked to do the same but can override in necessary circumstances.\n ` +
        `FYI @${process.env.ADMIN_USER}`,
    });
    console.log('Process completed successfully!');
  } catch (e) {
    console.error('Error while setting admin branch protection', e);
  }
}
