import { gql } from 'apollo-server-express';

export default gql`

  type Director {
    id: ID!
    name: String!
    birthday: Date!
    country: String!
  }
`;