import { Service, ServiceForm, User } from "./connectors";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

const resolvers = {
  Query: {
    getService(args) {
      return Service.find({ where: args });
    },
    getOneUser(args) {
      return User.findOne({ where: args });
    },
    getListOfServices(args) {
      return Service.findAll({
        attributes: ["id", "name", "description", "size"]
      });
    },
    getServices(args) {
      return Service.findAll({
        where: {
          id: {
            [Op.or]: args
          }
        }
      });
    }
  },
  Creation: {
    createServiceForm(args) {
      return ServiceForm.create(args).catch(error => {
        console.error(error);
      });
    }
  }
};

export default resolvers;
