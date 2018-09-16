// TODO: Modify TEXT fields to json

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'service',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      form_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      size: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'service'
    }
  );
