import { gql } from 'apollo-server';

export const orderTypes = gql`
  input OrderInput {
    sellerId: String!
    shop: String!
    shopifyOrderId: String!
    orderNumber: String! 
  }

  type Order {
    id: String!
    seller: User!
    shop: String!
    shopifyOrderId: String!
    orderNumber: String!
  }
`;

