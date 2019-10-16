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
export  const registerSuccess = {
    query: ` mutation{
        register(input:{
          email:"rohit@successive.tech"
          password:"12345678"
        }){
        data{
          token
        }
          status
        }
      }`,
    context: {dataSources},
    expected: {
        "data": {
            "token": "dd0578c3e95ad65dc7b4a131f7fb5033b059ab9a044ed886bbc487774d25f86612ca76bf926eb1bad57f9418a672b6dc3715a9c3c384ee0573067b0700f79656"
          },
          "status": "ok"  },
    queryName: 'register',
  }
  export  const registerWithNullEmail = {
    query: ` mutation{
        register(input:{
          email:""
          password:"12345678"
        }){
        data{
          token
        }
          status
        }
      }`,
    context: {dataSources},
    expected: {
      "data": {
            "token": "null"
          },
          "status": "error"  
    },
    queryName: 'register',
  }
  export  const registerWithNullPassword = {
    query: ` mutation{
        register(input:{
          email:"rohit@successive.tech"
          password:""
        }){
        data{
          token
        }
          status
        }
      }`,
    context: {dataSources},
    expected: {
      "data": {
        "token": "null"
      },
      "status": "error"
    },
    queryName: 'register',
  }
  export  const registerWithLessPassword = {
    query: ` mutation{
        register(input:{
          email:"rohit@successive.tech"
          password:"1234"
        }){
        data{
          token
        }
          status
        }
      }`,
    context: {dataSources},
    expected: {
      "data": {
        "token": "null"
      },
      "status": "error"
    },
    queryName: 'register',
  }
describe('Register', function () {
    const typeDefs = [...Object.values(types)];
    // console.log('sche',schema)
// console.log('*************',stub);

  beforeAll((done) => {
    // stub.createAllStubs();
    stub = sinon.stub(resolvers.Mutation,'register');
    schema = makeExecutableSchema({ typeDefs,resolvers })
    done();
  });


  test('login with successfull', async () => {
    const { query,expected,queryName,context } = registerSuccess;
    stub.returns({
        
            "data": {
              "token": "dd0578c3e95ad65dc7b4a131f7fb5033b059ab9a044ed886bbc487774d25f86612ca76bf926eb1bad57f9418a672b6dc3715a9c3c384ee0573067b0700f79656"
            },
            "status": "ok"
       });
    const result = await graphql(schema, query,null,context, {})
    expect(result.data[queryName]).toEqual(expected);
    })
    

    test('register with null field email', async () => {
      const { query,expected,queryName,context } = registerWithNullEmail;
      stub.returns({
        "data": {
          "token": "null"
        },
        "status": "error"
        
         });
      const result = await graphql(schema, query,null,context, {})
      expect(result.data[queryName]).toEqual(expected);
      })
   
      test('register with null field password', async () => {
        const { query,expected,queryName,context } = registerWithNullPassword;
        stub.returns({
          "data": {
            "token": "null"
          },
          "status": "error"
           });
        const result = await graphql(schema, query,null,context, {})
        expect(result.data[queryName]).toEqual(expected);
        })
        test('register with less than 8 character password', async () => {
          const { query,expected,queryName,context } = registerWithLessPassword;
          stub.returns({
            "data": {
              "token": "null"
            },
            "status": "error"
             });
          const result = await graphql(schema, query,null,context, {})
          expect(result.data[queryName]).toEqual(expected);
          })
});
