/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
    post_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'user',
          schema: 'resolution'
        },
        key: 'user_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'category',
          schema: 'resolution'
        },
        key: 'category_id'
      }
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'place',
          schema: 'resolution'
        },
        key: 'place_id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dt_creation: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'post',
    schema: 'resolution'
  });
};
