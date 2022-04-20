//cd
// Users table for authentication
const { sequelize } = require('../database/config');
const { User } = sequelize.models;
// passport strategies used
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
// encryptation tool
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;

// register with local strategy
passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            // passReqToCallback: true,
            session: false,
        },
        async (email, password, done) => {
            try {
                // Verify the user is not already registered
                const user = await User.findOne({
                    where: {
                        email,
                    },
                });
                if (user != null) {
                    console.log('email already registered');
                    return done(null, false, {
                        message: 'email already registered',
                    });
                }
                // Encrypt password
                const hashedPassword = await bcrypt.hash(
                    password,
                    BCRYPT_SALT_ROUNDS
                );
                // create and return user
                let newUser = await User.create({
                    email,
                    password: hashedPassword,
                });
                console.log('user created');
                return done(null, newUser);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// login with local strategy
passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        async (email, password, done) => {
            try {
                // Verify the user exists in db
                const user = await User.findOne({
                    where: {
                        email,
                    },
                });
                if (user === null) {
                    return done(null, false, {
                        message: 'email not registered',
                    });
                }
                // compare password with db
                const response = await bcrypt.compare(password, user.password);
                if (response !== true) {
                    console.log('Incorrect password');
                    return done(null, false, { message: 'Incorrect password' });
                }
                // return user
                console.log('user found & authenticated');
                return done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);

const opts = {
    jwtFromRequest: ExtractJWT.fromHeader('x-token'),
    secretOrKey: process.env.SECRET_JWT_SEED,
    passReqToCallback: true,
};

// jwt strategy for authentication
passport.use(
    'jwt',
    new JWTstrategy(opts, async (req, jwt_payload, done) => {
        try {
            const user = await User.findByPk(jwt_payload.uuid);
            if (user) {
                console.log('user found in db in passport');
                req.uuid = jwt_payload.uuid;
                req.name = jwt_payload.name;
                req.email = jwt_payload.email;
                return done(null, user);
            } else {
                console.log('user not found in db');
                done(null, false);
            }
        } catch (err) {
            done(err);
        }
    })
);
