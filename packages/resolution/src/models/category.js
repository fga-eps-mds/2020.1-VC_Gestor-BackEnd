/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'category',
    schema: 'resolution'
  });
};
