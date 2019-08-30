
export default (sequelize, DataTypes) => {
  const Movie = sequelize.define('movie', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    scoutbase_rating: {
        type: DataTypes.FLOAT,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    rating: {
        type: DataTypes.INTEGER,
      },
      
  });

  Movie.associate = models => {           
    Movie.hasMany(models.Actor)
    Movie.hasMany(models.Director)
  };

  return Movie;
};