
export default (sequelize, DataTypes) => {
    const Actor = sequelize.define('actor', {
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
  
  
    return Actor;
  };
