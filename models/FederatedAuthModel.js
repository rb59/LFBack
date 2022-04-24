//cd
const {DataTypes} = require('sequelize');

const FederatedAuth = (sequelize) => sequelize.define('Federated_auth',{
    provider: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    paranoid: true,
});

module.exports = FederatedAuth;