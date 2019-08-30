import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      password: String!
    ): AuthPayload!
    
    signIn(
      username: String!
      password: String!
      ): AuthPayload!

    refreshTokens(
      token: String!, 
      refreshToken: String!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }
`;