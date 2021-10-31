# Libary of Open Source Hardware Frontend

## Developing

The LOSH frontend is a monorepo comprising of a client and server package. The client is a React application built on the Gatsby framework using the GraphQL server as a data source.

### Get Access

To develop the server package locally you will need SSH access to the Elastic web server. 

1. Contact Andre for with an access request along with a copy of your public key.

2. Create an SSH tunnel to the web server.

`ssh -p 41022 -L 9200:elasticsearch.library-of-open-source-hardware.svc:9200 YOUR_USERNAME@opensourceecology.de`

This will forward all requests to `http://localhost:9200` through the web server.

### Stack

#### Client
- Gatsby v3 (React JS)
- [Ant Design System](https://ant.design/components/overview/)
- Typescript
- Jest (Unit tests)
- Cypress (e2e tests)
- Typescript

#### Server
- GraphQL
- Express
- Jest (Unit tests)
- Typescript

### Setting up Dev

Clone the repository

Run `yarn` or `yarn install` in the repostitory directory to install the dependencies.

To start the server in development mode:

Run `yarn server start`

The start the client in development mode:

Run `yarn client start`

### Build

To build the server package:

Run `yarn server build`. The compilation output will be in `packages/server/dist`.

To build the client package:

Run `yarn client build`. The compilation output will be in `packages/client/public`.

### Testing

#### Unit tests

Run all client tests using Jest

`yarn client test:unit`

#### End to end

Run `yarn client test:e2e` to run the e2e tests with Cypress locally.
Or use `yarn client test:e2e:ci` to run them in a pipeline or in a headless browser locally.

## Building

To build an artifact for deployment, run `yarn build`.

## Style Guide

Code style is enforced locally using Husky as a precommit hook, and is tested in the pipeline. Code that does not conform to the style will cause a build to fail.

If the pre-commit hooks are not working correctly, run `yarn husky` to install the Git hooks.

- Commits must use the [Conventional Commits](https://www.conventionalcommits.org/) format.
- Files are linted and formatted using a combination of ESLint and Prettier.

## Guidelines

All files must be linted and formatted before committing changes. All staged files will automatically be linted/formatted using a git pre-commit hook. If you are running into issues with failing builds at the format stage in the CI pipeline, please check that the pre-commit hook is running properly on your local machine.
