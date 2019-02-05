# Installation

## Requirements

* [Node.js](https://nodejs.org/en/) >= 6.9.0
* [NPM](https://www.npmjs.com/) >= 3.10.8
* [Yarn](https://yarnpkg.com/) >= 0.21.0

## Installation

* Clone the repository from [https://github.com/leapfrogtechnology/chill](https://github.com/leapfrogtechnology/chill):

      $ git clone git@github.com:leapfrogtechnology/chill.git

* Navigate to the directory and install all dependencies listed in [package.json](package.json) using npm or **yarn (recommended)**:

      $ cd chill
      $ yarn

* Make a copy of `chill.yml.dist` as `chill.yml` and update the configurations as per your need:

      $ cp chill.yml.dist chill.yml

## Usage

    $ yarn start

## Tests

Tests can be run similarly using:

    $ yarn test

Watch for changes to test files using: `yarn test:watch` while doing development.

## Lint

[ESLint](https://eslint.org/) is being used for style checking. It is recommended to run the linter before committing anything:

    $ yarn lint

Fix common linter issues:

    $ yarn lint:fix
