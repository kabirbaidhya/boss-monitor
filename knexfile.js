require('babel-register');

const config = require('./src/config/config');
const dbConfig = config.resolve().db;
const { client, connection } = dbConfig;

module.exports = {
  client,
  connection,
  migrations: {
    directory: './src/migrations'
  }
};
