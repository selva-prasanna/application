const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_jwt_secret'; 
// Store securely, e.g., in environment variables

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.status(403).send('No token provided.');

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send('Failed to authenticate token.');
        req.userId = decoded.id; // Store user ID in request for use in other routes
        next();
    });
};

module.exports = verifyToken;
