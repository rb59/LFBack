// cd
const {Sequelize} = require('sequelize');
// const {setAssoc} = require('./relations');

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    
    pool: {
      max: 10,
      min: 0,
      acquire: 5000,
      idle: 1000
    }
  });
//   const modelDefiners = [
//       require('../models/UserModel'),
//       require('../models/ProfileModel'),
      
//     ];
    
//     // We define all models according to their files.
//     for (const modelDefiner of modelDefiners) {
//         modelDefiner(sequelize);
// }


// setAssoc(sequelize);


const dbConnection = async () => {
    try {
        // await sequelize.sync();
        await sequelize.authenticate();
        console.log('DB online')
    } catch (error) {
        console.log(error.message);
        throw new Error('Error initializing DB');
    }
};
module.exports = {
    sequelize,
    dbConnection,
};
