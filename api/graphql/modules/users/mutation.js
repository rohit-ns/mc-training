export const userMutations = {
  register: async (parent, args, { dataSources }) => {
    try {
      const { input: { email,password }} = args;
      //console.log('!!!!!!!!!!!!!!!!!!',args);
      const result = await dataSources.userApi.registerUser(email, password);
      //console.log('!@#$%^&*$%^&*#$%^#$%^$%^', result);
      return result;
    } catch (error) {
      //console.log('!!!!!!!!!!!!!>>>>>>>>>>>>>>>>>>>>>>>', error.extensions.response);
      return error;
    }
  }
}
