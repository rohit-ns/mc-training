import { 
  orderQueries,
  orderMutations,
  productQueries,
  productMutations,
  userQueries,
  userMutations,

  productSubscriptions
} from "./modules";


export default {
  Query: {
    ...userQueries,
    ...productQueries,
    ...orderQueries
  },
  Product: {
    // owner: ({ ownerId: userId }) => {
    //   const user = userQuery.getUser('_', ({ userId }));
    //   console.log('user', user);
    //   return user;
    // }
  },
  Order: {
    id:({ _id }) => _id
  },
  Mutation: {
    ...orderMutations,
    ...productMutations,
    ...userMutations
  },
  // Subscription: {
  //   ...productSubscriptions
  // }
};

