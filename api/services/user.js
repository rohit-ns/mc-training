import { RESTDataSource } from 'apollo-datasource-rest';

export default class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:8000/';
  }
  willSendRequest(req) {
    req.headers.set('Host', 'auth');
    req.headers.set('ApiKey', this.context.apikey);
  }
  async registerUser(email, password) {
    const result = await this.post('/user/register', { email,password });
    //console.log('!!!!!!!!!!!!!!!!!!!!!!>>>>>>>>>>>>>>', result);
    if (!result) {
      //console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrrr', err);
      return err;
    }
    return result;
  }
}
