module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'service_form',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      values: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'service_form'
    }
  );
