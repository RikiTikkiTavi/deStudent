/* eslint-disable no-unused-vars */
import serviceModel from './service';
import serviceFormModel from './service_form';
import userModel from './user';

const defineModels = (db, Sequelize) => {
  serviceModel(db, Sequelize);
  serviceFormModel(db, Sequelize);
  userModel(db, Sequelize);
  db.sync({ force: false });
};

export default defineModels;
