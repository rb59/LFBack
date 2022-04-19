/* 
    Auth routes
    path = host/api/auth 
*/
const { Router } = require('express');
// Validation
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const {isDate} = require('../helpers/isDate');
const { jwtValidator } = require('../middlewares/jwtValidator');
// Controllers
const { createUser, loginUser, /*renewToken */} = require('../controllers/auth');

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

// router.get('/renew', [jwtValidator], renewToken);

module.exports = router;
