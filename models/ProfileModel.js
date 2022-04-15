//cd
const {DataTypes} = require('sequelize');

const Profile = (sequelize) => sequelize.define('Profile',{
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    birthday: {
        type: DataTypes.DATE,
    },
    photo: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    paranoid: true,
});

module.exports = Profile;