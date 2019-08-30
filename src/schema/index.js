import { gql } from 'apollo-server-express';

import userSchema from './user';
import actorSchema from './actor';
import movieSchema from './movie'
import directorSchema from './director'


const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema, 
  userSchema, 
  actorSchema, 
  movieSchema, 
  directorSchema, 
];
