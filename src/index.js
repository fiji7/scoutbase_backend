import cors from 'cors';
import express from 'express';
import http from 'http';
import {
  ApolloServer
} from 'apollo-server-express';
import { isAuthenticated} from './utils/authorization';
import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import getMe  from './utils/getMe'
import dotenv from 'dotenv'
dotenv.config()



var app = express()

const corsOptions = {
  uri: '*',
  credentials: true,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  
  typeDefs: schema,
  resolvers,
  isAuthenticated,
  formatError: error => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, res, connection }) => {
    if (connection) {
      return {
        models,
      };
    }
    if (req) {
    const me = await getMe(req);
    return {
      res,
      models,
      me,
      secret: process.env.SECRET,
      isAuthenticated
    };
  }
  },
});


server.applyMiddleware({ app, path: '/graphql', cors: false });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isProduction = !!process.env.DATABASE_URL;

sequelize.sync({ isProduction }).then(async () => {
  createDummyData()
httpServer.listen({ port: 8000 }, () => {
    console.log(`Apollo Server on http://localhost:8000/graphql`);
  });
});
const createDummyData = async () => {
  try {
  await models.Movie.bulkCreate([
    {
      title: 'Titanic',
      year: 2004,
      rating: 5,
      scoutbase_rating: (Math.random() * (9.0 - 5.0) + 5.0).toFixed(1)
    },
    {
      title: 'Avatar',
      year: 2010,
      rating: 4,
      scoutbase_rating: (Math.random() * (9.0 - 5.0) + 5.0).toFixed(1)
    },
    {
      title: 'Jango',
      year: 2012,
      rating: 6,
      scoutbase_rating: (Math.random() * (9.0 - 5.0) + 5.0).toFixed(1)
    }
  ]

  );
  await models.Actor.bulkCreate([
    {
      name: 'Adam Wex',
      birthday: new Date(),
      country: 'Poland',
      movieId: 1
    },
    {
      name: 'Rasmus Mex',
      birthday: new Date(),
      country: 'USA',
      movieId: 3
    },
    {
      name: 'Brad Pitt',
      birthday: new Date(),
      country: 'Germany',
      movieId: 2
    }
  ]

  );
  await models.Director.bulkCreate([
    {
      name: 'Jared Leto',
      birthday: new Date(),
      country: 'Ukraine',
      movieId: 3
    },
    {
      name: 'Alex Dimitrov',
      birthday: new Date(),
      country: 'Russia',
      movieId: 3
    },
    {
      name: 'Luke Jackson',
      birthday: new Date(),
      country: 'USA',
      movieId: 2
    }
  ]

  );
} catch (err) {
   console.log('Dummy data already creted ;)')
  }
};