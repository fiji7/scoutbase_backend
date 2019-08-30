import { createUser } from '../utils/authorization'
import { createTokens} from '../utils/generateToken'
export default {
  Query: {
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findById(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { username, password },
      { models , secret},
    ) => 
    createUser(username, password, models, secret),
    
    signIn: async (
      parent,
      {username, password },
      { models, secret },
    ) => 
     {
      const user = await models.User.findOne({where: {username: username}});

      if (!user) {
        throw new Error(
          'No user found with this login credentials.',
        );
      }
  
      const isValid = await user.validatePassword(password);
  
      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }
      
      const [token, refreshToken] = await createTokens(user, secret);
  
      return {
        token,
        refreshToken
      }
    },

  },


};