import sinon from 'sinon';
// import base services
import resolvers from '../../api/graphql/resolvers'

class StubHelper {
  constructor() {
    this.loginUser;
    this.sandBox = sinon.sandBox();
}
  createAllStubs() {
      this.loginUser = this.sandBox.stub(resolvers.Query,'login');
  }
}
export default new StubHelper();