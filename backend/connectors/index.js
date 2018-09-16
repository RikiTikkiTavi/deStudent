/* eslint-disable import/no-dynamic-require,import/prefer-default-export */
import Sequelize from 'sequelize';

const chalk = require('chalk');
// import DataLoader from 'dataloader';
//
// import casual from 'casual';
// import _ from 'lodash';
// import fetch from 'node-fetch';

import defineModels from '../models/_defineModels';

const env = 'development'; // process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];

const dbConnection = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

dbConnection
  .authenticate()
  .then(() => {
    console.warn(chalk.green('===Successfull Connection==='));
  })
  .catch(err => {
    console.error(chalk.red('Unable to connect to database:'), err);
  });

defineModels(dbConnection, Sequelize);

const Service = dbConnection.models.service;
const ServiceForm = dbConnection.models.service_form;
const User = dbConnection.models.user;

export { Service, ServiceForm, User };
