import Sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

  const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD,  {
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
    ssl: true
  })

  const models = {
    User: sequelize.import('./user'),
    Director: sequelize.import('./director'),
    Actor: sequelize.import('./actor'),
    Movie: sequelize.import('./movie'),
  };
  
  Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
      models[key].associate(models);
    }
  });
  
  export { sequelize };
  export default models;