//cd
const {DataTypes} = require('sequelize');

const ProjectUpdate = (sequelize) => sequelize.define('Project_update',{
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    paranoid: true,
});

module.exports = ProjectUpdate;