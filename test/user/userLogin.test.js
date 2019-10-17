import {graphql} from 'graphql';
import * as types from '../../api/graphql/rootTypes'
import { makeExecutableSchema,addMockFunctionsToSchema } from 'graphql-tools';
import resolvers  from '../../api/graphql/resolvers';
// import {userQueries} from '../../api/graphql/modules/users/query'
import sinon from 'sinon';

const dataSources = {
    userApi: resolvers
}
var schema,stub;
export  const LoginSuccess = {
    query: ` query{
      login(input:
      {
        email:"rohit.kumar@successive.tech"
        password:"12345678"
        
      }){
        status
        message
        data
      }
    }`,
    context: {dataSources},
    expected: {
      "message": "Login Successfully",
      "status": "200",
      "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdiM2MzN2ZhMTBlNjNmZTVhYmMyY2MiLCJlbWFpbCI6InJvaGl0QHN1Y2Nlc3NpdmUudGVjaCIsIm5hbWUiOiJSb2hpdCIsInBhc3N3b3JkIjoiJDJiJDEwJHQyVU0vQnR3dGx5eExXOFlNM1FDRi5hQS5HTFYzOENCWmNESEJ0RVNwbmNBMk5YYjNUSzVlIiwicm9sZSI6ImhlYWQtdHJhaW5lciIsImNyZWF0ZWRCeSI6IjVkN2IzYzM3ZmExMGU2M2ZlNWFiYzJjYyIsIm9yaWdpbmFsSWQiOiI1ZDdiM2MzN2ZhMTBlNjNmZTVhYmMyY2MiLCJjcmVhdGVkQXQiOiIyMDE5LTA5LTEzVDA2OjUwOjMxLjE3NVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA5LTEzVDA2OjUwOjMxLjE3NVoiLCJfX3YiOjAsImlhdCI6MTU2ODM2MjQyNiwiZXhwIjoxNTY4MzYzMzI2fQ.aARUEu2WCOxiCXnXUesGzfzvXEh9ndPVHu72Fdmcd2s"
    },
    queryName: 'login',
  }
  export  const wrongEmail = {
    query: ` query{
      login(input:
      {
        email:"rohit.kuma@successive.tech"
        password:"12345678"
        
      }){
        message
      }
    }`,
    context: {dataSources},
    expected: {
      "message": "Wrong Email",
          },
    queryName: 'login',
  }
  export  const wrongPassword = {
    query: ` query{
      login(input:
      {
        email:"rohit.kuma@successive.tech"
        password:"1234567877"
        
      }){
        message
      }
    }`,
    context: {dataSources},
    expected: {
      "message": "Wrong Password",
          },
    queryName: 'login',
  }
describe('login', function () {
    const typeDefs = [...Object.values(types)];
    // console.log('sche',schema)
// console.log('*************',stub);

  beforeAll((done) => {
    // stub.createAllStubs();
    stub = sinon.stub(resolvers.Query,'login');
    schema = makeExecutableSchema({ typeDefs,resolvers })
    done();
  });


  test('login with successfull', async () => {
    const { query,expected,queryName,context } = LoginSuccess;
    // console.log('context',context);
    stub.returns({
        "message": "Login Successfully",
        "status": "200",
        "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdiM2MzN2ZhMTBlNjNmZTVhYmMyY2MiLCJlbWFpbCI6InJvaGl0QHN1Y2Nlc3NpdmUudGVjaCIsIm5hbWUiOiJSb2hpdCIsInBhc3N3b3JkIjoiJDJiJDEwJHQyVU0vQnR3dGx5eExXOFlNM1FDRi5hQS5HTFYzOENCWmNESEJ0RVNwbmNBMk5YYjNUSzVlIiwicm9sZSI6ImhlYWQtdHJhaW5lciIsImNyZWF0ZWRCeSI6IjVkN2IzYzM3ZmExMGU2M2ZlNWFiYzJjYyIsIm9yaWdpbmFsSWQiOiI1ZDdiM2MzN2ZhMTBlNjNmZTVhYmMyY2MiLCJjcmVhdGVkQXQiOiIyMDE5LTA5LTEzVDA2OjUwOjMxLjE3NVoiLCJ1cGRhdGVkQXQiOiIyMDE5LTA5LTEzVDA2OjUwOjMxLjE3NVoiLCJfX3YiOjAsImlhdCI6MTU2ODM2MjQyNiwiZXhwIjoxNTY4MzYzMzI2fQ.aARUEu2WCOxiCXnXUesGzfzvXEh9ndPVHu72Fdmcd2s"
    });
    const result = await graphql(schema, query,null,context, {})
    expect(result.data[queryName]).toEqual(expected);
    })
    
    test('login with wrong Email', async () => {
      const { query,expected,queryName,context } = wrongEmail;
      // console.log('context',context);
      stub.returns({
          "message":"Wrong Email"      
        });
      const result = await graphql(schema, query,null,context, {})
      expect(result.data[queryName]).toEqual(expected);
      })
      test('login with wrong Password', async () => {
        const { query,expected,queryName,context } = wrongPassword;
        // console.log('context',context);
        stub.returns({
            "message":"Wrong Password"      
          });
        const result = await graphql(schema, query,null,context, {})
        expect(result.data[queryName]).toEqual(expected);
        })
});
