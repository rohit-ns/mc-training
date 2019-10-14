import { gql } from 'apollo-server';

export const userTypes = gql`
  type User {
  id: String!
  isGeneralSetup: Boolean
  email: UserEmail!
  shopId: String
  firstName: String
  lastName: String
  brandName: String
  location: String
  roles: UserRole!
}

  type UserRole {
    name: String!
  }
  # enum UserEnum {
  #   Provider: provider
  #   Operator: operator
  #   Fulfiller: fullfiller
  #   Sourcer: sourcer
  # }

  # type UserRole {
  #   name: UserEnum
  # }

  type UserEmail {
    address: String
    verified: Boolean
  }
  input loginInput{
    email:String
    password:String
  }
  type loginResponse{
    status:String
    message: String
    data:String
  }
`;

