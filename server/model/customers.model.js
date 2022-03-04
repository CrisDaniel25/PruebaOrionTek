const { DataTypes } = require('sequelize');

function model(sequelize) {
    const attributes = {
        customerId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        phonenumber: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.BOOLEAN, allowNull: false }
    };

    return sequelize.define('customers', attributes);
}

module.exports = model;