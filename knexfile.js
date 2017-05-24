require('babel-register');
const config = require('./src/config/config').default;

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: `${config.db.path}`
  },
  migrations: {
    directory: './src/migrations'
  }
};
