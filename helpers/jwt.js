const jwt = require('jsonwebtoken');

const jwtGenerator = (uuid, name, email) => {
    return new Promise((resolve, reject) => {
        const payload = { uuid, name, email};
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: '30d',
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('Token could not be generated');
                }
                resolve(token);
            }
        );
    });
};

module.exports = {
    jwtGenerator,
};
