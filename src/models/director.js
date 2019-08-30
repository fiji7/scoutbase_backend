
export default (sequelize, DataTypes) => {
    const Director = sequelize.define('director', {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      birthday: {
        type: DataTypes.DATE,
      },
      country: {
          type: DataTypes.STRING,
        },
        
    });
  
  
    return Director;
  };