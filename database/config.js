// cd
const {Sequelize} = require('sequelize');
const {setAssoc} = require('./relations');

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
  const modelDefiners = [
      require('../models/ChatRoomModel'),
      require('../models/MessageModel'),
      require('../models/ProfileModel'),
      require('../models/ProjectModel'),
      require('../models/ProjectUpdateModel'),
      require('../models/RequestModel'),
      require('../models/RoleModel'),
      require('../models/UserModel'),
    ];
    
    // We define all models according to their files.
    for (const modelDefiner of modelDefiners) {
        modelDefiner(sequelize);
}


setAssoc(sequelize);


const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(/*{force:true}*/);
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
