# Libary of Open Source Hardware Frontend

The LOSH frontend is a monorepo comprising of a client and server package. The client is a React application built on the Gatsby framework using the GraphQL server as a data source.

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

# Table of Contents

1. [Develop](#develop)
2. [Build](#build)
3. [Test](#test)
4. [Deploy](#deploy)
5. [Style Guide](#style-guide)

## Develop

### Get Access

To develop the server package locally you will need SSH access to the Elastic web server.

1. Contact the administrator with an access request to the Elastic server along with a copy of your public key.

2. Setup your SSH config file for the host.

```
Host losh
    Hostname opensourceecology.de
    IdentityFile ~/.ssh/KEYFILE
    Port 41022
    User YOUR_USERNAME
```

4. Create an SSH tunnel to the web server. (Replace YOUR_USERNAME with the username assigned by the administrator).

`ssh -p 41022 -L 9200:elasticsearch.library-of-open-source-hardware.svc:9200 YOUR_USERNAME@opensourceecology.de`

This will forward all requests to your local machine `http://localhost:9200` through the web server.

### Setting up Dev

Clone the repository

Run `yarn` or `yarn install` in the repostitory directory to install the dependencies.

To start the server in development mode:

Run `yarn server start`

The start the client in development mode:

Run `yarn client start`

## Building

### Server

To build the server package, there are two environment variables required:

**ELASTIC_API_URL** - Points to the Elastic instance
**WIKIBASE_API_URL** - Points to the Wikibase REST API

Run `yarn server build`. The compilation output will be in `packages/server/dist`.

### Client

To build the client package, the URL of the deployed server package should be provided as an environment variable:

**GRAPHQL_API_URL** - Points to the deployed server package

Run `yarn client build`. The compilation output will be in `packages/client/public`.

## Testing

### Unit tests

Run all client tests using Jest

`yarn client test:unit`

### End to end

Run `yarn client test:e2e` to run the e2e tests with Cypress locally.
Or use `yarn client test:e2e:ci` to run them in a pipeline or in a headless browser locally.

## Deploy

After [Building](#build) the packages, the client bundle in `packages/client/public` can be hosted on any HTTP server (Apache, Nginx, Amazon S3, etc.)

The server bundle found in `packages/server/dist` should be hosted on a node server and started using `node server.js`

## Style Guide

Code style is enforced locally using Husky as a precommit hook, and is tested in the pipeline. Code that does not conform to the style will cause a build to fail.

If the pre-commit hooks are not working correctly, run `yarn husky` to install the Git hooks.

- Commits must use the [Conventional Commits](https://www.conventionalcommits.org/) format.
- Files are linted and formatted using a combination of ESLint and Prettier.

### Guidelines

All files must be linted and formatted before committing changes. All staged files will automatically be linted/formatted using a git pre-commit hook. If you are running into issues with failing builds at the format stage in the CI pipeline, please check that the pre-commit hook is running properly on your local machine.
