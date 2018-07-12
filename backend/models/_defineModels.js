/* eslint-disable no-unused-vars */
import serviceContentModel from './service_content';
import serviceFormModel from './service_form';
import userModel from './user';

const defineModels = (db, Sequelize) => {
  serviceContentModel(db, Sequelize);
  serviceFormModel(db, Sequelize);
  userModel(db, Sequelize);
  db.sync({ force: false });
};

export default defineModels;
