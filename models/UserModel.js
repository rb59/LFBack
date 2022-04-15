//cd
const {DataTypes} = require('sequelize');

const User = (sequelize) => sequelize.define('User',{
    UUID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pin: {
        type: DataTypes.STRING(4)
    },
    status: {
        type: DataTypes.ENUM(['0','1']),
        defaultValue: '1',
    },

}, {
    sequelize,
    paranoid: true,
});

module.exports = User;