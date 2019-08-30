import { createTokens} from './generateToken'

 export const createUser = async ( username, password, models, secret) => {
    const user = await models.User.create({
        username,
        password,
      });
    
     const [token] = await createTokens(user, secret);
    
     return {
       token,
     }
}

