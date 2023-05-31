const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.id;
        req.auth = {userId};
        if (req.body.id && req.body.id !== userId) {
            throw 'Invalid user ID';
        } else {
            console.log('Authorized user!');
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};