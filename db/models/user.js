'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cupboard, { foreignKey: 'userId' })
    User.hasMany(models.Rating, { foreignKey: 'userId' });
    
  };
  return User;
};
