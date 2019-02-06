# Chill REST API

REST API and the persistance layer for the [chill](https://github.com/leapfrogtechnology/chill) monitoring service. 

The monitor (chill) could be used as a standalone monitoring service too, but if you need to persist the status change logs and/or visualize the status change data into the [dashboard](https://github.com/leapfrogtechnology/chill-dashboard) you'll need this service.

## Setup

Install dependencies
```bash
# Using npm
$ npm install

# Or using yarn
$ yarn
```
Create a config file `chill.yml` using the sample file if it doesn't exist already.
```bash
$ cp chill.yml.dist chill.yml
```

Run migrations
```
$ CHILL_CONFIG=/path/to/chill.yml yarn migrate
```

Then start the server by providing the config file path. If this is not provided, it will expect the file to be in the current directory.
```
$ CHILL_CONFIG=/path/to/chill.yml yarn start
```

## Contributing

Read our [contributing guide](https://github.com/leapfrogtechnology/chill/blob/master/CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## License

Chill is licensed under the [MIT License](LICENSE.md).
