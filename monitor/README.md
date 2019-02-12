# Chill

[![Code Climate](https://img.shields.io/codeclimate/github/kabisaict/flow.svg?style=flat-square)](https://codeclimate.com/github/leapfrogtechnology/chill)
[![Build Status](https://img.shields.io/travis/leapfrogtechnology/chill.svg?style=flat-square)](https://travis-ci.org/leapfrogtechnology/chill)
[![Codecov](https://img.shields.io/codecov/c/github/leapfrogtechnology/chill.svg?style=flat-square)](https://codecov.io/github/leapfrogtechnology/chill?branch=master)

A simple service monitoring tool.

## Setup

Install dependencies
```bash
# Using npm
$ npm install

# Or using yarn
$ yarn
```

Create a `db` file.
```
$ touch chill.db
```

Create a config file `chill.yml` using the sample file if it doesn't exist already.
```bash
$ cp chill.yml.dist chill.yml
```

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
