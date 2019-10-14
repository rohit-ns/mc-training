import dotenv from 'dotenv';
import { EnvVars } from '../libs/constants';


if (process.env.NODE_ENV === EnvVars.TEST) {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

export default {
  apiPrefix: process.env.API_PREFIX || '/api',
  mongoUrl: process.env.mongo_url,
  MONGO_URL:process.env.MONGO_URL,
  nodeEnv: process.env.NODE_ENV,
  oktaUri: process.env.OKTA_URL,
  oktaClientId: process.env.OKTA_CLIENT_ID,
  port: process.env.PORT,
  socketUrl: process.env.SOCKET_URL,
  playGround: process.env.PLAYGROUND || true,
  introspection: process.env.INTROSPECT || true,
  roleManagerServiceUrl: process.env.ROLE_MANAGER_SERVICE_URL,
  secretkey:process.env.SECRET_KEY
};
