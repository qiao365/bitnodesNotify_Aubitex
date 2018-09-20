var Sequelize = require('sequelize');
var sequelize = new Sequelize('peatio_production', 'root', null, {
    // port:3306,
    // dialect: 'mysql'
    host: "localhost",
    logging: false,
    define: {
        freezeTableName: true,
        underscored: true
    },
    dialect: 'postgres',
    timezone: '+08:00' //东八时区
});
const CONFIG = {
    ethereum:{
    }
}
exports.CONFIG = CONFIG;
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;