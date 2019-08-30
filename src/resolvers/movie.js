
export default {
    Query: {
      movies: async (parent, args, { models, me }) => {
          if(!me){
            return await  models.Movie.findAll({
                attributes: {exclude: ['scoutbase_rating']}
            })
          }else{
            return await  models.Movie.findAll()
          }

      },
    },
    Movie: {
        actors: async (user, args, { models }) => {
          return await models.Actor.findAll()
        },
        directors: async (user, args, { models }) => {
            return await models.Director.findAll();
          },
    }

    
}