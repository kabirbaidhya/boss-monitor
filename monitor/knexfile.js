require('@babel/register');

const config = require('./src/config/config');
const dbConfig = config.resolve().db;

module.exports = Object.assign({}, dbConfig, {
  migrations: {
    directory: './src/migrations'
  }
});
