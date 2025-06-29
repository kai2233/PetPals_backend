const jwt = require('jsonwebtoken')


const verifyAccessToken = (req, res, next) =>{
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
}

module.exports = {verifyAccessToken}