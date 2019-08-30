import jwt from 'jsonwebtoken';

const createTokens = async (user, secret) => {
    const { id, email, username, role } = user;
    const createToken = await jwt.sign({ id, email, username, role }, secret, {
      expiresIn: '1d', 
    });
  
    const createRefreshToken = await jwt.sign({ id }, secret, {
      expiresIn: '7d',
    });

    return [
      createToken,
       createRefreshToken]
       
  };

  export {createTokens}