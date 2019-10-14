export default {
  roleAdded: {
    subscribe: () => pubsub.asyncIterator('roleAdded')
  },
  // userUpdated: {
  //     subscribe: () => pubsub.asyncIterator('userUpdated')
  // },
  roleDeleted: {
    subscribe: () => pubsub.asyncIterator('roleDeleted')
  }
};
