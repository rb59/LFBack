//cd
const {DataTypes} = require('sequelize');

const Request = (sequelize) => sequelize.define('Request',{
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(['0','1','2']),
        defaultValue: '1',
    },

}, {
    sequelize,
    paranoid: true,
});

module.exports = Request;