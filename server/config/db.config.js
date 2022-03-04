const variables = require('../../config.json');
const config = variables.DATABASE;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  operatorsAliases: false,
  pool: {
    max: config.POOL.MAX,
    min: config.POOL.MIN,
    acquire: config.POOL.ACQUIRE,
    idle: config.POOL.IDLE
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
let Customer = db.customers = require("../model/customers.model")(sequelize, Sequelize);
let Address = db.addresses = require("../model/addresses.model")(sequelize, Sequelize);
Customer.hasMany(Address, {
  foreignKey: 'customerId'
});
Address.belongsTo(Customer);
module.exports = db;