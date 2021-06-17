# Dunder Mifflin Technologies

Version control platform(s): They currently use Gerrit, out-of-the-box Git, Subversion, and Team Foundation Server.

## Modernization

_Dunder Mifflin is worried they are falling behind their industry. They have lots of legacy software and development patterns that were created 20 years ago. They have found it incredibly difficult to change any aspect of their SDLC because of their infrastructure, processes, and long-tenured team members who are resistant to change._

Application Modernization and a move towards DevOps is a large cultural change within the company but the benefits will help with speed and quality of software delivery, increased innovation, enhanced security and a greater overall collaborative culture. Below are some areas that will need to be addressed in your modernization journey.

- **Digital Transformation**

  - **Leadership Support** - A change this large needs support and financial backing from top level leadership. We will need a deeper dive review of the current state of development and put together a cost benefit analysis, determine necessary resources needed and a high level timeline.
  - **Change Management Team** - This can be a large effort and a team should be put together to manage this transformation.
  - The **Voice of the Customer** (VOC) is critical in this transformation. Understanding the current pain points and where the resitance lies in a transformation this large is key. These issues will need to be addressed early on and throughout the process. Keeping an open line of communication via many channels is critical to success.
  - **Training and Documentation** will facilitate the transformation by making information easily available to users.
  - **Transparency** throughout the process will earn respect from all. Not everyone will be on board with the change and that is OK. What can be controlled is that information is distributed continously and truthfully and everyone is treated with respect.

- **Security** - Application security is a hot topic in the world we live in. Many things will need to be addressed including limiting access to code, secret scanning, dependency scanning, required reviews, and compliance and audit acceptance.
- **Collaboration and InnerSource** - Collaborative and InnerSource culture allows teams to cross collaborate and share code. This can reduce development cycles by removing duplicate efforts across silos.
- **Four Key Metrics** - There is no silver bullet when it comes to tracking success at DevOps but there are four key metrics that top performers are consistently doing well. Tracking these metrics can help determine succes but are not a panacea. (See [Accelerate](https://itrevolution.com/book/accelerate/) for more information) These four metrics are:
  - Lead time - the time code takes to move from development to production
  - Deployment Frequency - How often code is deployed into production
  - Mean Time to Restore (MTTR) - The mean time it takes for failed code to be restored to a previous 'good' state
  - Change Fail Percentage - How often new changes fail in production

## Help us release more often

_Dunder Mifflin releases software four times a year. They are shipping largely web-based applications. They want to increase more frequently, but they are unsure of the best first steps. What areas would you explore with the customer to help them move this goal forward?_

There are multiple facets that allow for code to be released more frequently. Below are some high level topics that will need to be addressed.

- **Source Control Management** - Knowing that you have multiple source control systems, it is highly recommended to move to a single git based system
- **Continuous Integration and Continuous Delivery** - We will need to dive deeper to understand how you are currently integrating and delivering code. CI/CD can allow for faster flow of code from Dev to Prod with less need for human intervention. Moving to an approach without needing to manage infrastructure can increase the time developers spend on business value-add activities.
- **Automated Testing** - The level of automated unit, integration and system testing (among others) will enable code to be shipped faster as trust in the process grows. Tracking code coverage is a key metric.
- **Psychological Safety** - Developers should be given the autonomy to make decisions and fail without fear of repercussions.
- **Observability and Monitoring** - Observability and monitoring of software enables fast feebdback loops for developers to discover issues and continue to integrate code fast.

The above elements are part of a baseline DevOps culture. The road to modernization is a long journey and will require commitment and continuous learning along with way.

## Commit/merge/deploy permissions

_Dunder Mifflin has expressed concern about moving away from Gerrit. They have asked how they can control repository access, merging, and deployment permissions within GitHub, and what aspects of their desired security setup can be enforced programmatically._

With GitHub you have full control over who can access, merge and deploy code in repositories. Merging can be blocked based on automated tasks being performed which can include building, multiple levels of automated testing and security scanning. In addition one to many code reviews can be required before allowing merging.
Audit logs are also available in case of any issues.
In additional to all of this, GitHub provides a robust API that allows for programatic acces to nearly all areas withing Github. This will allow you to monitor compliance and provide 'guardrails' to your developers.

With all of the above topics I believe GitHub is a great fit as your new DevSecOps platform. Please feel free to reach out to deep dive into any of these topics wiht myself and the GitHub team.

Thanks,
Jeremy
