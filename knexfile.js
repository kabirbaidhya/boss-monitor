require('babel-register');

const config = require('./src/config/config');
const { client, connection } = config.resolve().db;

module.exports = {
  client,
  connection,
  migrations: {
    directory: './src/migrations'
  },
  useNullAsDefault: true
};
