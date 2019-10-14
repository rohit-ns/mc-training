import { gql } from 'apollo-server';

export const productTypes = gql`
type Product {
  id: String
  availability: String
  name: String
  condition: String
  ecommercePlatform: String
  description: String
  dimension: ProductDimesion
  price: Int
  primaryImage: String
  storeProductId: Int
  type: String
  weight: Int
  owner: User
  provider: [User]
  operator: [User]
  fullFiller: [User]
}

type ProductCore {
  _id: String!
  title: String!
  vendor: String!
  handle: String!
  vendorId: String!
  status: String!
  inventoryManagement: String!
  isTaxable: Boolean!
}

type ProductImage {
  name: String
  path: String
}

type ProductDimesion {
  depth: Int
  height: Int
  width: Int
}

input ProductInput {
  title: String!
  handle: String!
  inventoryManagement: String
  vendor: String!
  vendorId: String!
  status: String!
  isTaxable: Boolean
}

type ProductRes {
  productId: String!
}

# type PrimaryImage {
# ToDO its a plain obj in model
# }
`;

