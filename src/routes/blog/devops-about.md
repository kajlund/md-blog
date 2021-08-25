---
title: About DevOps
createdAt: 2019-04-11
description: An introduction to the DevOps field
---


# {title}

> {description}


#### Resources

* The Visible Ops Handbook, Continuous Delivery by Jez Humble & David Farley, Release It! by Michael Nygard, Effective DevOps by Jennifer Davis, Lean Software Development by Poppendieck, Web Operations by John Allspaw, The Practice of Cloud System Administration, The DevOps Handbook, Leading the Transformation - Applying Agile and DevOps Principles at Scale, The Phoenix Project
* [Dev2Ops Website](http://dev2ops.org/)
* [DevOps Days](https://devopsdays.org/), [Velocity](https://conferences.oreilly.com/velocity)
* [Newsletter](https://www.devopsweekly.com/)
* [Infrastructures.org](http://infrastructures.org/)

## What is DevOps?

* The practice of operations and development engineers participating together in the entire service lifecycle, from design through the development process to production support.
* Should tear down the walls between devs and ops
* [What is DevOps article](https://theagileadmin.com/what-is-devops/)

### 5 Levels

1. Values
2. Principles
3. Methods
4. Practices
5. Tools

## Why DevOps?

* [Proven effective](https://puppet.com/resources/whitepaper/2015-state-devops-report) in improving both the IT and business outcomes.

1. High performing IT organizations deploy more frequently, fail less, and recover faster
2. Lean management and continuous delivery practices help deliver values faster
3. High performance is achievable whether your apps are greenfield, brownfield, or legacy.

## Core Values - CAMS

The 4 fundamental values to bring to a devops implementation.

* Culture - Avoid Dev vs Ops
* Automation - [popot](http://dev2ops.org/2010/02/people-over-process-over-tools/)
* Measurement - MTTR, Cycle Time, Costs, Revenue
* Sharing - Openess and transparancy drives Kaizen (Discrete continuous improvement)

> That the word DevOps gets reduced to technology is a manifestation of how badly we need a cultural shift.
--Patrick DeBois

See [article](https://blog.chef.io/2010/07/16/what-devops-means-to-me/), [devops culture](http://itrevolution.com/devops-culture-part-1/)

## Principles

* [The 3 Ways](http://itrevolution.com/the-three-ways-principles-underpinning-devops/)
* Use the 3 ways to implement processes and standards suitable for your team.

### Systems thinking

* Focus on the overall outcome of the **entire** pipeline or value chain. (Compare to optimizing code without knowing the bottleneck) - Concept to Cash.
* Use systems thinking when planning how to measure outcome.

 ### Amplifying feedback loops

* Short, effective feedback loops are key to effective product development and operations

### Culture of continuous experimentation and learning

* Focus on doing and experimenting
* Actively try what works and what doesn't
* Typical sayings in this area is: Working code wins, if it hurts, do it more and fail fast.
* No one technology is a silver bullet.

## 5 Most Prevalent devOps Methodologies

1. [People over process over tools](http://dev2ops.org/2010/02/people-over-process-over-tools/), Find responsible, define process and lastly find and imlement tools to solve the problem.
2. Continuous Delivery - Code, test and release continuously. See [HP Case](http://itrevolution.com/the-amazing-devops-transformation-of-the-hp-laserjet-firmware-team-gary-gruver/)
3. Lean Management - Work in small batches, Work in progress limits, feedback loops, Vizualization. Has been proved to lead to better throughput and stability
4. Change Control - [The Visible Ops Handbook](). Operational success correlates with control over changes in environment. Eliminate fragile artifacts, create a repeatable build process, manage dependencies, create environment for continuous improvement.
5. Infrastructure as Code - Systems can and should be treated like code. Checked into source control, Reviewed, built, and tested.

## 10 Practices for DevOps Success

1. Chaos Monkey - [Netflix blog](https://medium.com/netflix-techblog)
2. Blue/Green Deployment - Have two identical systems, where one is live. Update offline system, test and point live to it.
3. Dependency injection - Losely coupled dependencies. Check [Fowler](https://martinfowler.com/articles/injection.html)
4. Andon Cords - Anyone can halt the process when needed
5. The Cloud - Allows you to treat infrastructure like you would any other program component. API-driven control.
6. Embedded Teams - Add ops person to dev team and make dev team responsible for operations of their particular software.
7. Blameless Postmortems - See [How complex systems fail paper](http://web.mit.edu/2.75/resources/random/How%20Complex%20Systems%20Fail.pdf)
8. Public Status Page - Communication is the way for customers to keep trusting your service. See [Transparent Uptime blog](http://www.transparentuptime.com/)
9. Developers on Call - Responibility for services created. This tends to make sure core problem is resolved quickly instead of operations using workarounds.
10. Incident Command System - See [Chapman](https://www.usenix.org/legacy/event/lisa05/tech/chapman.pdf)

## Tools

* [DevOps toolchain](https://en.wikipedia.org/wiki/DevOps_toolchain)
* Be careful when selecting tools. Each tool has a logistics tail
* Criteria: Programmable, verifiable (events and metrics), well behaved (config in SCM-compatible format)

## Culture and Communication

> Wall of confusion - Impedence mismatch caused by DevTeam usually organized by app or business sector - Infra team often by technology stack. -> Ineffective -> Outsourcing -> New problems

### Blameless Postmortems

* A meeting that should be held within 48 hrs of the incident, if possible
* Have a third party run the meeting
* Goal is to avoid same or similar problems in the future
* Make a description of the incident
* Identify the root cause (five why's)
* How the incident was stabilized or fixed
* Make a timeline of events, including all actions taken
* How the incident affected customers
* Remediations and corrective actions with deadlines

### Transparent Uptime

Rules for Postmortem Communication:

1. Admit failure
2. Sound like a human
3. Have a communication channel (independent of your site)
4. Above all else, be authentic

### Trust Blockers

1. Lack of context
2. Conflicting goals

### Open It Up

1. Chat rooms
2. Wiki pages
3. Source code (read)
4. Infrastructure
5. Monitoring tools
6. Ticket tracker

### The Westrum Model

* Pathological (power-oriented)
* Bureaucratic (rule-oriented)
* Generative (performance-oriented)

Minimum viable process - Everybody onboard, remove unnecessary

### Management Best Practices

* Independent, cross-functional teams
* People first
* Agile, lean processes

### Kaizen: Continuous improvement

* Good processes bring good results
* Go see for yourself (gemba)
* Speak with data, manage by facts
* Take action to contain and correct root causes
* Work as a team
* Kaizen is everybody's business

## Building Blocks

* Agile
* Lean
* ITIL, ITSM, SDLC

### Agile

* DevOps rooted in the Agile Software movement.
* The Agile Manifesto
* Frequent interrim deliverables. Sprints (Plan, Design, Build, Test, Review, Launch)

### Lean

A systematic approach for eliminating waste. DevOps is an extension of Agile infrastructure in which its process is iterative or repeated in cycles.

You strive to:

1 Eliminate waste
2 Amplify Learning
3 Decide as late as possible
4 Decide as fast as possible
5 Empower the team
6 Build in integrity
7 See the whole

**Muda**: Work that absorbs resources but adds no value
**Muri**: Unreasonable work imposed on workers and machines
**Mura**: Work coming in unevenly instead of a constant or regular flow

Wastes:

1 Partially done work
2 Extra features
3 Relearning
4 Handoffs
5 Delays
6 Task switching
7 Defects

Eric Ries - The Lean Startup adapted lean as:

> Build - Measure - Learn

1 Build the minimum viable product
2 Measure the outcome and internal metrics
3 Learn about your problem and your solution
4 Repeat. Go deep where needed

#### Lean Techniques

* Kaizen - continuous improvements
* Valuestream Mapping - Concept to cash

CAMS to CALMS

* Culture
* Automation
* Measurement
* Sharing

### ITIL, ITSM and the SDLC

IT service management (ITSM) refers to the entirety of activities – directed by policies, organized and structured in processes and supporting procedures – that are performed by an organization to design, plan, deliver, operate and control information technology (IT) services offered to customers.

Information Technology Infrastructure Library or ITIL provides a comprehensive process-model based approach of designing, managing, and controlling IT processes.

ITIL Phases:

1 Service Strategy
2 Service Design
3 Service Transition
4 Service Operation

## Infrastructure Automation

### Infrastructure as code

* A programmatic approach to infrastructure
* AWS - JSON format called CloudFormation

### Configuration Management

* Management of change control for system configuration after initial provision
* Maintaining and upgrading the application and application dependencies

Approaches:

* Imperative/Procedural - Commands necessary to produce desired state are defined and executed.
* Declarative/functional - A desired state is defined, relying on the tool to configure a system to match that state.

> Idempotent - The ability to execute repeatedly, resulting in the same outcome.

> Self service - The ability for an end user to initiate a process without having to go through other people.

See the [Golden image or Foil Ball](https://madstop.com/post/85950592485/golden-image-or-foil-ball-repost)

#### CM Tools

* CFEngine
* Puppet
* [Chef](https://www.chef.io/)
* Salt
* [Ansible](https://www.ansible.com/)

#### Services Directory/State Tracking Tools

* etcd
* ZooKeeper
* Consul

#### Container Orchestration Tools

* Dockersform
* Kubernetes
* Mesos

#### Private Container Services

* Rancher
* Google Cloud Platform
* Amazon Web Services ECS

## CI & CD (Continuous Delivery)

* Strive to automatically build, test and deploy on every commit.

* Continuous Integration - Build and test frequently, ideally on every commit
* Continuous Delivery - Additionally deploy to production-like environment and run automated integration and acceptance tests
* Continuous Deployment - Additionally deploy automatically to production.

Benefits:

1 Time to market goes down
2 Quality increases, not decreases
3 Continuous Delivery limits work in progress
4 Shortens lead times for changes
5 improves mean time to recover

> How "little" can you deliver?

* The goal of continuous integration is that software is in a working state all the time - Jez Humble

important practices:

* Builds should pass the coffee test (less than 5 minutes)
* Commit really small bits
* Don't leave the build broken
* Use a trunk-based development flow
* Don't allow flaky tests. Fix them!
* The build should return a status, a log, and an artifact

Continuous Delivery Pipeline:

* Only build artifacts once
* Artifacts should be immutable, checksums can help
* Deployment should go to a copy of production
* Stop deploys if a previous step fails
* Deployments should be idempotent

Trace a single code change through the pipeline and answer the following:
1 Can you audit a single change and trace it through the pipeline? Cycle
2 Overall cycle time

Flow - frequency of commits

Contnuous Delivery requires automated testing
1 Unit Testing
2 Code hygiene - Linters, formatters and best practices
3 Integration Testing
4 Security Testing (Gauntlet)
5 TDD/BDD/ATDD
6 Infrastructure Testing
7 Performance Testing

### Tooling

* VCS - git, github
* CI - Jenkins, gocd, bamboo, teamcity, travisCI, CircleCI
* Build - make/rake, maven, gulp, packer
* Test - mocha, eslint, Robot, Selenium, sauce labs...
* Artifacts repo - [Nexus](https://www.sonatype.com/nexus-repository-sonatype)
* Deployment - Rundeck, Deployinator

## Site reliability engineering (SRE)

Key success metrics

* Deployment frequency
* Lead time for changes
* Change failure rate
* Mean time to recovery MTTR (less than 1hrs)
* Mean time between failures (MTBF)

A circuitbreaker detects a threshold of failures and prevents further failure by stopping an application from repeatedly executing that action to protect the system.

Michael Nygard popularized the [Circuit Breaker pattern](https://martinfowler.com/bliki/CircuitBreaker.html) in his book Ship It!

See [the twelwe factor app](https://12factor.net/) for good practices to avoid common problems.

### [How Complex Systems Fail](http://web.mit.edu/2.75/resources/random/How%20Complex%20Systems%20Fail.pdf)

* Change introduces new forms of failure
* Complex Systems contain changing mixtures of failures latent within them.
* All complex systems are always running in degraded mode

### Monitoring

* Service performance and uptime
* Software component metrics (port, process)
* System metrics (time series)
* App Metrics
  * Error counts
  * Number of logins
* Performance
* Security monitoring

### Logging

The 5 Ws of Logging:

* What happened
* When did it happen
* Where did it happen
* Who was involved
* Where did that entity come from

Centralized logging: syslog -> Logstash

Principles:

1 Don't collect log data that you will never use
2 Only retain log data for as long it is probable you'll need it
3 Log whatever is usable but alert only things that needs action. Use loglevels where errors require action, else warn
4 Logging should meet business needs, not exceed them!
5 Logs change

### SRE Tools

* Monitoring - [Nagios](https://www.nagios.org/),
  * SaaS - Pingdom, Datadog, Netuitive, Ruxit, Librato
  * Enterprise - New Relic, App Dynamics
  * Open Source - graphite, grafana, statsd, ganglia, icinga, sensu
  * Time Series DBs - InfluxDB, OpenTSDB
  * Metrics libs - [metrics.dropwizard.io](https://metrics.dropwizard.io/4.0.0/)
  * Containers - Prometheus, sysdig
* Log Management
  * splunk, the [ELK-stack](https://www.elastic.co/elk-stack)
  * SaaS - [Pagerduty](https://www.pagerduty.com/), [victorops](https://portal.victorops.com/membership/#/)
  *  Open Source - [Flapjack](https://flapjack.io/)
* Status
  * Saas - [Statuspage](https://www.statuspage.io/)
* Command Dispatcher
  * Rundeck, satstack, ansible
  * rerun
* Security
  * [Gauntlet](https://gauntlet.io/en/services/sdlc-audit/)

## Future

* Cloud Computing
* Containers
* Serverless (Functions as a Service or nanocompute)
* Security - [The Rugged Manifesto](https://ruggedsoftware.org/)
  * Continuous Audit

