const dotenv = require('dotenv');
dotenv.config();

const {
  DB_URL,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST
} = process.env;

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  // "development": {
  //   "username": "postgres",
  //   "password": "admin",
  //   "database": "healmithy",
  //   "host": "127.0.0.1",
  //   "dialect": "postgres"
  // },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "admin",
    "database": "healmithy_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
