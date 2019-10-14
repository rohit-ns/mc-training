import { User } from '../../../repositories';
import logger from '../../../libs/logger';
import * as jwt from 'jsonwebtoken';
import config from './../../../config'

export const userQueries = {
  getUser: async (_, {userId }) => {
    try {
      const user = await User.load(userId);
      return user;
    } catch (err) {
      logger.error(`error finding user with id: ${userId}`);
    }
  },
  login: async (parent, args) => {
    try {
      console.log('@@@@@@@@@@', args);

      const { input: { email,password}} = args;
      console.log('>>>>>>>>>>>>>>',email,password)

    
      const result = await User.findOne({ email,password });

      const res = JSON.parse(JSON.stringify(result));
      console.log('!!!!!!!!!!!!!!!!!!!!', res)
    
    //  console.log('token:::::::::::::::::::::::::',token);
      if (!res) {
        return {
          message: 'Error! Please enter correct details'
        }
      } else {
       // console.log('here',res);
         const token = jwt.sign(res, config.secretkey);
        return {
          status: 'ok',
          message: 'Login Successfully',
          data: token
        }
      };
    } catch (error) {
      console.log('error:::::::::::::::::::::::',error)
      return error;
    }
  },
};
