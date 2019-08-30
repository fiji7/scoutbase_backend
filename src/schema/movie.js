import { gql } from 'apollo-server-express';


export default gql`
  extend type Query {
    movies: [Movie!]
  }

  type Movie {
    id: ID!
    scoutbase_rating: Float
    title: String!
    year: Int!
    rating: String!
    actors: [Actor!]
    directors: [Director!]
  }
`;

