import { ServiceContent } from './connectors';

const resolvers = {
  Query: {
    getServiceContent(args) {
      return ServiceContent.find({ where: args });
    }
  }
};

export default resolvers;
