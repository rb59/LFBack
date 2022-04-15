const setAssoc = (sequelize) => {
    const {
        Chat_room, 
        Message,
        Profile,
        Project, 
        Project_update,
        Request,
        Role, 
        User, 
    } = sequelize.models;

    Role.hasMany(User);
    User.belongsTo(Role);

    User.hasOne(Profile);
    Profile.belongsTo(User);

    User.hasMany(Project);
    Project.belongsTo(User);
    
    Project.hasMany(Project_update);
    Project_update.belongsTo(Project);

    Project.hasMany(Request);
    Request.belongsTo(Project);
    
    Project.hasOne(Chat_room);
    Chat_room.belongsTo(Project);

    User.hasMany(Message);
    Message.belongsTo(User);
    Chat_room.hasMany(Message);
    Message.belongsTo(User);

};

module.exports = {setAssoc};