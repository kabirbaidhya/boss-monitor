<div align="center">
  <a href="https://github.com/leapfrogtechnology/chill">
    <img width="128px" src="chill.png"/> 
  </a>
  <br/>
  
# chill

> A simple service monitoring tool.

[![Build Status](https://img.shields.io/travis/leapfrogtechnology/chill.svg?style=flat-square)](https://travis-ci.org/leapfrogtechnology/chill)
[![Codecov](https://img.shields.io/codecov/c/github/leapfrogtechnology/chill.svg?style=flat-square)](https://codecov.io/github/leapfrogtechnology/chill?branch=master)
[![License](https://img.shields.io/github/license/leapfrogtechnology/chill.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

Don't Panic. Just Chill!

</div>

# Setup

* Clone the repository.

  ```bash
  $ git clone git@github.com:laudio/web-app.git
  ```

* Navigate to every folder `api`, `monitor`, `dashboard`, `core` and install the dependencies.

  ```bash
  $ yarn
  ```

* Create a `db` file under `monitor` folder.

  ```
  $ touch chill.db
  ```

* Create a config file `chill.yml` using the sample file if it doesn't exist already.

  ```bash
  $ cp chill.test.yml chill.yml
  ```

* Add db path to the `chill.yml` file.

  ```yml
  db:
    client: 'sqlite3'
    connection:
      filename: '/path/to/monitor/chill.db'
  ```

* Run migrations from the `monitor` folder.

  ```
  $ cd monitor
  $ yarn migrate
  ```

* To run locally, run this command from `monitor`, `api` and `dashboard` directories.

  ```bash
  $ yarn start
  ```

* Running tests

  ```bash
  $ yarn test
  ```

### Building for Production

```bash
$ yarn build
```

## Contributing

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## Changelog

Check the [CHANGELOG](CHANGELOG.md) for full release history.

## License

Licensed under [The MIT License](LICENSE).
