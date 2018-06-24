/* eslint-disable no-unused-vars */
import serviceContentModel from './service_content';

const defineModels = (db, Sequelize) => {
  serviceContentModel(db, Sequelize);
  db.sync({ force: false });
};

export default defineModels;
