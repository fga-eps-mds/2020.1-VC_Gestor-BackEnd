/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('place', {
    place_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    place_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'place',
    schema: 'resolution'
  });
};
