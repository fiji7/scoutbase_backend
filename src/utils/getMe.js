import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

 const getMe = async (req) => {
    const token = req.headers['x-token'];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        return req.user = user;
      } catch (e) {
          throw new AuthenticationError(
          'Your session expired. Sign in again.',
        );

      }
    }
  };

  export default getMe