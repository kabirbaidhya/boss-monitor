<div align="center">
  <a href="https://github.com/leapfrogtechnology/chill">
    <img width="128px" src="chill.png"/> 
  </a>
  <br/>
  
# chill

[![Build Status](https://img.shields.io/travis/leapfrogtechnology/chill.svg?style=flat-square)](https://travis-ci.org/leapfrogtechnology/chill)
[![Codecov](https://img.shields.io/codecov/c/github/leapfrogtechnology/chill.svg?style=flat-square)](https://codecov.io/github/leapfrogtechnology/chill?branch=master)
[![License](https://img.shields.io/github/license/leapfrogtechnology/chill.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

A simple service monitoring tool.
<br/> Don't Panic. Just Chill!

</div>

## Setup
Clone this repository.

```bash
$ git clone git@github.com:laudio/web-app.git
```

Install dependencies in every folder (api, monitor, dashoard and core). Make sure you already have `nodejs`, `npm` and `yarn` installed in your system.
```bash
# Using npm
$ npm install

# Or using yarn
$ yarn
```

Create a `db` file under `monitor` folder.
```
$ touch chill.db
```

Create a config file `chill.yml` using the sample file if it doesn't exist already.
```bash
$ cp chill.test.yml chill.yml
```

## Running locally
```bash
$ yarn start
```

## Running tests
```bash
$ yarn test
```

## Building for Production
```bash
$ yarn build
```

## Run linter
```bash
$ yarn lint:fix
```

## Contributing

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## Change Log

Check the [CHANGELOG](CHANGELOG.md) for full release history.

## License

Licensed under [The MIT License](LICENSE).


React frontend for Laudio.

# Chill

[![Code Climate](https://img.shields.io/codeclimate/github/kabisaict/flow.svg?style=flat-square)](https://codeclimate.com/github/leapfrogtechnology/chill)
[![Build Status](https://img.shields.io/travis/leapfrogtechnology/chill.svg?style=flat-square)](https://travis-ci.org/leapfrogtechnology/chill)
[![Codecov](https://img.shields.io/codecov/c/github/leapfrogtechnology/chill.svg?style=flat-square)](https://codecov.io/github/leapfrogtechnology/chill?branch=master)


## Setup






Add the db path to the `chill.yml` file
```yml
db:
  client: 'sqlite3'
  connection:
    filename: '/path/to/chill.db'
```

Run migrations
```
$ CHILL_CONFIG=/path/to/chill.yml yarn migrate
```

Then start the app
```
$ CHILL_CONFIG=/path/to/chill.yml yarn start
```

## Contributing

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## License

Chill is licensed under the [MIT License](LICENSE.md).
