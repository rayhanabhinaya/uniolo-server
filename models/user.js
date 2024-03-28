'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {foreignKey: "authorId"})
      
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "this username is already taken"
      },
      validate: {
        notNull: {
          msg: "username is required"
        },
        notEmpty: {
          msg: "username is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "this is email is already registered"
      },
      validate: {
        notNull: {
          msg: "email is required"
        },
        notEmpty: {
          msg: "email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required"
        },
        notNull: {
          msg: "password is required"
        },
        len: {
          args: 6,
          msg: "password at least 6 characters"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "staff"
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((User, option) => {
    User.password = bcrypt.hashSync(User.password, 8) 
  })
  return User;
};