//cd
const {DataTypes} = require('sequelize');

const Project = (sequelize) => sequelize.define('Project',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    budget: {
        type: DataTypes.DECIMAL(15,3),
    },
    status: {
        type: DataTypes.ENUM(['0','1','2']),
        defaultValue: '1',
    },

}, {
    sequelize,
    paranoid: true,
});

module.exports = Project;