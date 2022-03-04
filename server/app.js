const db = require('../server/config/db.config');
require("dotenv").config();
const cors = require('cors');
const express = require("express");
const bodyparser = require('body-parser');

const app = express();

// accessible to any
app.use(cors());

// database
db.sequelize.sync().then(function() {
    console.log("Database synced successfully");
}).catch(function(err) {
    console.log(err)
});

// Body Parser middleware to handle raw JSON files
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

// routes
app.use('/api/customers', require('./routes/customers.route')); // customers routes
app.use('/api/addresses', require('./routes/addresses.route')) // addresses routes

// when invalid routes are entered
app.use(async (req, res) => {
    res.status(404).send(`Route is no where to be found.`);
});

module.exports = app;