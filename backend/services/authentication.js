require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Looks for a header usually formatted as "Bearer <token>"
    const authHeader = req.headers['authorization'];
    // Split that string to grab just the long scrambled part (the token) and ignores the word "Bearer"
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) {
            return res.sendStatus(403);
        }
        // Save the user's info (email, role) into res.locals
        res.locals = response;
        next();
    });
}

module.exports = { authenticateToken: authenticateToken };