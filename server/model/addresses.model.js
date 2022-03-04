const { DataTypes } = require('sequelize');

function model(sequelize) {
    const attributes = {
        addressId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        country: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        street: { type: DataTypes.STRING, allowNull: false }, 
        building: { type: DataTypes.STRING, allowNull: false },
        zip: { type: DataTypes.INTEGER, allowNull: false },
    };
    
    return sequelize.define('addresses', attributes);
}

module.exports = model;