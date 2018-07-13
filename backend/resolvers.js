import { ServiceContent, ServiceForm, User } from './connectors';

const resolvers = {
  Query: {
    getServiceContent(args) {
      return ServiceContent.find({ where: args });
    },
    getOneUser(args) {
      return User.findOne({ where: args });
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
