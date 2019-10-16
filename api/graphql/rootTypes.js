import { gql } from 'apollo-server';

export { 
  orderTypes,
  productTypes,
  userTypes
} from './modules';

export default gql`
  type Query {
    getUser(userId: ID!): User
    getProducts(userId: ID!): [ProductCore]!
    getCoreProductsByOwner(userId: ID!): [Product]!
    getProduct(productId: ID!): Product
    getProductCore(productId: ID!): ProductCore!
    getOrderById(orderId: ID!): Order!
    login(input:loginInput):loginResponse
  }

  type Mutation {
    saveProduct(product: ProductInput!): ProductCore!
    saveOrder(order: OrderInput!): Order!
    register(input:registerInput):registerResponse
   
  }

  type Subscription {
    productAdded(productId: ID!): ProductCore
    productDeleted(productId: ID!): ProductCore
  }
`;
