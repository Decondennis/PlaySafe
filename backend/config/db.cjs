
const { Sequelize } = require("sequelize");
 
const db = new Sequelize('playsafe', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
module.exports = db;