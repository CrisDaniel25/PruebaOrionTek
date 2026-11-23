const variables = require('../../config.json');
const config = variables.DATABASE;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME || config.DATABASE, process.env.DB_USER || config.USER, process.env.DB_PASSWORD || config.PASSWORD, {
  host: process.env.DB_HOST || config.HOST,
  port: process.env.DB_PORT || 3306,
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
