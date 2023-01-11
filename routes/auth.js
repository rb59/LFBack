/* 
    Auth routes
    path = host/api/auth 
*/
const { Router } = require('express');
// Validation
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const {isDate} = require('../helpers/isDate');
// Controllers
const { createUser, loginUser, googleLogin, renewToken } = require('../controllers/auth');
const passport = require('passport');

const router = Router();

router.post(
    '/register',
    [
        check('firstName', 'First name field is required').not().isEmpty(),
        check('lastName', 'Last name field is required').not().isEmpty(),
        check('birthday', 'Birthday field is required').not().isEmpty(),
        check('birthday', 'Birthday field must be a valid date').custom(isDate),
        check('email', 'Email field is required').isEmail(),
        check('password', 'Password must be at least 6 chars long').isLength({
            min: 6,
        }),
        fieldsValidator,
    ],
    createUser
);

router.post(
    '/login',
    [
        check('email', 'Email field is required').isEmail(),
        check('password', 'Password must be at least 6 chars long').isLength({
            min: 6,
        }),
        fieldsValidator,
    ],
    loginUser
);

router.get('/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google',{ session: false }), googleLogin);

router.get('/renew', passport.authenticate('jwt',{session:false}), renewToken);

module.exports = router;
