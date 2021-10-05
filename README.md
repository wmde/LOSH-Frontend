# Libary of Open Source Hardware Frontend

## Developing

### Stack

- Gatsby v3 (React JS)
- [Ant Design System](https://ant.design/components/overview/)
- Typescript
- Jest (Unit tests)
- Cypress (e2e tests)

### Setting up Dev

Clone the repository

Run `yarn` or `yarn install` in the repostitory directory to install the dependencies.

Use `yarn start` or `gatsby develop` if you have Gatsby installed globally.

If the pre-commit hooks are not working correctly, run `yarn husky` to install the Git hooks.

### Testing

#### Unit tests

Run all tests using Jest

`yarn test:unit`

#### End to end

Run `yarn test:e2e` to run the e2e tests with Cypress locally.
Or use `yarn test:e2e:ci` to run them in a pipeline or in a headless browser locally.

## Building

To build an artifact for deployment, run `yarn build`.

## Style Guide

Code style is enforced locally using Husky as a precommit hook, and is tested in the pipeline. Code that does not conform to the style will cause a build to fail.

- Commits must use the [Conventional Commits](https://www.conventionalcommits.org/) format.
- Files are linted and formatted using a combination of ESLint and Prettier.

## Guidelines

All files must be linted and formatted before committing changes. All staged files will automatically be linted/formatted using a git pre-commit hook. If you are running into issues with failing builds at the format stage in the CI pipeline, please check that the pre-commit hook is running properly on your local machine.
