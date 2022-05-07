const { response } = require('express');
const bcrypt = require('bcryptjs');
const {sequelize} = require('../database/config');
const {User, Profile, Role} = sequelize.models;
const { jwtGenerator } = require('../helpers/jwt');
const passport = require('passport');

const createUser = async (req, res = response, next) => {
    passport.authenticate('signup', async(err,userInfo,info) => {
        try {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: err,
                });
            }
            if (info !== undefined) {
                console.log(info.message);
                return res.status(400).json({
                    ok: false,
                    msg: info.message,
                });
            }
            req.login(userInfo, async err => {
                const user = await User.findOne({
                    where: {
                        email: userInfo.email,
                    },
                });
                const role = await Role.findOne({
                    where: {
                        type: 'user',
                    },
                });
                await user.setRole(role);
                const userProfile = await Profile.create({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    birthday: req.body.birthday,
                });
                await userProfile.setUser(user);
                const name = `${userProfile.first_name} ${userProfile.last_name}`;
                const token = await jwtGenerator(user.UUID, name, user.email);
                res.status(201).json({
                    ok: true,
                    uuid: user.UUID,
                    name,
                    email: user.email,
                    token,
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Internal database error. Please contact an administrator',
            });
        }
    })(req,res,next);
};

const loginUser = async (req, res = response, next) => {
    passport.authenticate('login', async(err,userInfo,info) => {
        try {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: err,
                });
            }
            if (info !== undefined) {
                console.log(info.message);
                return res.status(400).json({
                    ok: false,
                    msg: info.message,
                });
            }
            req.login(userInfo, async err => {
                const user = await User.findOne({
                    where: {
                        email: userInfo.email,
                    },
                    include: Profile,
                });              
                const name = `${user.Profile.first_name} ${user.Profile.last_name}`;
                const token = await jwtGenerator(user.UUID, name, user.email);
                res.json({
                    ok: true,
                    uuid: user.UUID,
                    name,
                    email: user.email,
                    token,
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Internal database error. Please contact an administrator',
            });
        }
    })(req,res,next);  
};

const googleLogin = async (req, res = response) => {
    const { uuid, name, email, created } = req;
    try {
        if (created) {
            await Profile.create({
                first_name: name.givenName,
                last_name: name.familyName,
                UserUUID: uuid,
            });    
        }
        const fullName = `${name.givenName} ${name.familyName}`
        const token = await jwtGenerator(uuid, fullName, email);
        res.json({
            ok: true,
            uuid,
            name: fullName,
            email,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Internal database error. Please contact an administrator',
        });
    }
};
const renewToken = async (req, res = response) => {
    const { uuid, name, email } = req;
    const token = await jwtGenerator(uuid, name, email);
    res.json({
        ok: true,
        uuid,
        name,
        email,
        token,
    });
};

module.exports = {
    createUser,
    loginUser,
    googleLogin,
    renewToken,
};
