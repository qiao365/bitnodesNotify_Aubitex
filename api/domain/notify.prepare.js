var Sequelize = require('sequelize');
var sequelize = new Sequelize('peatio_production', 'root', null, {
    // host: "localhost",
    // logging: true,
    // timezone: "+08:00",  
    port:3306,
    // define: {
    //     freezeTableName: true,
    //     underscored: true
    // },
    dialect: 'mysql'
});
const CONFIG = {
    ethereum:{
    }
}
exports.CONFIG = CONFIG;
exports.Sequelize = Sequelize;
exports.sequelize = sequelize;