# Libary of Open Source Hardware Frontend

## Developing

This app is written using the Gatsby front end framework. Typescript....

Layout

- /markdown-pages, Markdown manually maintained page content
- /components, React components
- /pages, Templates for different routes
- /bin, scripts to generate data for the site

### Prerequisites

### Setting up Dev

Clone the repository

Run `yarn` or `yarn install` in the repostitory directory to install the dependencies.

Use `yarn start` or `gatsby develop` if you have Gatsby installed globally.

### Testing

#### Unit tests

#### End to end

Run `yarn test:e2e` to run the e2e tests with Cypress locally.
Or use `yarn test:e2e:ci` to run them in a pipeline or in a headless browser locally.

## Building

To build an artifact for deployment, run `yarn build`.

## Style Guide

- Commits must use the [Conventional Commits](https://www.conventionalcommits.org/) format.
- Files are linted using a combination of ESLint and Prettier.

## Guidelines
