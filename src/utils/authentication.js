import { createTokens} from './generateToken'
import { AuthenticationError, UserInputError } from 'apollo-server';

export const tryLogin = async (  username, password, models, secret ) => {
    const user = await models.User.findOne({where: {username: username}});

    if (!user) {
      throw new UserInputError(
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
}