import { GraphQLDateTime } from 'graphql-iso-date';
import userResolvers from './user';
import movieResolvers from './movie';



const customScalarResolver = {
    Date: GraphQLDateTime,
  };

export default [
    userResolvers, 
    movieResolvers,
    customScalarResolver
];
