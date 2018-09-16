module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      services: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      tableName: 'user'
    }
  );
