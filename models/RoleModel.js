//cd
const {DataTypes} = require('sequelize');

const Role = (sequelize) => sequelize.define('Role',{
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
});

module.exports = Role;