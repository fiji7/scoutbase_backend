import { gql } from 'apollo-server-express';

export default gql`

  type Actor {
    id: ID!
    name: String!
    birthday: Date!
    country: String!
  }
`;