const { response } = require('express');
// const bcrypt = require('bcryptjs');
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
/*
const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'No such email registered',
            });
        }

        // Match passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password',
            });
        }

        // Generate Web Token
        const token = await jwtGenerator(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
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
    const { uid, name } = req;
    const token = await jwtGenerator(uid, name);
    res.json({
        ok: true,
        token,
        uid,
        name,
    });
};
*/
module.exports = {
    createUser,
    /*loginUser,
    renewToken,*/
};
