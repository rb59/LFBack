//cd
const {DataTypes} = require('sequelize');

const Message = (sequelize) => sequelize.define('Message',{
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

}, {
    sequelize,
    paranoid: true,
    timestamps: true,
    createdAt: 'sent',
});

module.exports = Message;