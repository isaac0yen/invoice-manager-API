import user from './user.js';
import transaction from './transaction.js';

const resolvers = {
  Query:{
    ...user.Query,
    ...transaction.Query
  },
  Mutation:{
    ...user.Mutation,
    ...transaction.Mutation
  }
}

export default resolvers;