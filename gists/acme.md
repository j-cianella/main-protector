# Acme Computers

## Shrink large repository

_Acme wants GitHub to help them shrink the large repository to a more manageable size that is performant for common Git operations. The large repo is a project that is high visibility with an aggressive roadmap. They request that we help them within the month. It's a large, monolithic repository._

I understand that there is a large monolithic repository for a highly visibly project that is not performing well. Here are some tips for discovering some potential quick wins to reduce the size of the repo.

- **Build artifacts** - Generated libraries, binaries, installers or compressed files can take up unnecessary space. The recommendation is to store these files separate from the git repository itself. GitHub offers artifact storage as part of workflow runs as well as [releases](https://docs.github.com/en/github/managing-large-files/working-with-large-files/distributing-large-binaries). There are also other 3rd party tools available.
- **Media files** - Videos, photos and libraries of photos can also consume much of the repository space. Using a content delivery network (CDN) or cloud storage is recommended for these use cases as there is typically little benefit to having them versioned in git.
- **History of large files** - Large files in the repo, even when deleted, can take up space in the history of the git repository. If these files are no longer needed or if they can be stored elsewhere, there are tools that can remove them. See [here](https://docs.github.com/en/github/managing-large-files/working-with-large-files/removing-files-from-a-repositorys-history) for more information.
- **Long history of changes** - Long histories of changes over many years can add up to take up large amounts of space. History can be backed up elsewhere and removed from the live repo to immediately reduce the size. Shallow cloning can be used to only bring in the most recent changes when working with repository instead of the entire history.

## Consolidate instances

_Acme wants you to tell them the best way to move all the other teams, using GitHub Enterprise or other Git solutions, onto their consolidated GitHub Enterprise instance. They have asked you to give them five or six bullet points about how you would approach that initiative, both technically and culturally._

Consolidating multiple git servers into a single one will benefit the company allowing developers to focus on their value add objectives. The recommendations for approaching this initiative focus on project management, change management and architecture. The recommended high level approach is as follows:

- Take full inventory of affected users as well as all existing repositories and servers assigning champions from each group to help coordinate the migration
- Create process documentation and determine tooling for migration of git servers to a single instance
- Create and implement a change management plan communicating with all stakeholders early in the process and throughout minimizing impact while touting the benefits of the migration. Actively address any concerns stakeholders may have early in the process.
- Determine the timeline for the migration. Work with group champions to determine when this can best fit in with the teams release schedules
- Review the architecture of the GitHub Enterprise instance to be used to consolidate all instances. Make sure cost optimization, scalability, observability, monitoring and alerting, security, and availability meet current and future requirements before moving forward.
- Present to leadership getting buy-in to the timeline, cost and scope of changes needed.

Please feel free to reach out to me as needed, we are here to help and want Acme to be successful in this migration.

## Migrate an SVN repo

_The customer has one SVN repository that hasn't migrated over to a Git solution. They would like help moving this one large repository over. The team has a trunk based development pattern with this repository and is unfamiliar with Git._

For the large SVN repository that is still at Acme, I would recommend the following approach to migrate to your single GitHub Enterprise instance:

- Git training for developers is recommended for any developers that are using SVN and are not familiar with git. Resources are available at GitHub [Learning](https://lab.github.com/) with [learning paths](https://lab.github.com/githubtraining/first-day-on-github) available
- To perform the actual migration from SVN to GitHub resources are available [at GitHub training](https://training.github.com/downloads/subversion-migration)
- It will also be worth reviewing whether the trunk based development pattern continues to be the best route for Acme. Does it allow developers to ship code fast and reliable? Use of feature branching and even deeper with GitHub flow may benefit Acme and we can evaluate the benefit further.

Again, please feel free to reach out. Your success is our success.

Thank you,
Jeremy Cianella
