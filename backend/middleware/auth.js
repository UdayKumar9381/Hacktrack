const jwt = require('jsonwebtoken');
const College = require('../models/College');

const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header 
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log('Token received:', token); // Debugging line

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
        console.log('Decoded token:', decoded); // Debugging line

        // Fetch the college details from the database
        const college = await College.findById(decoded.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        req.college = college; // Attach college data to request
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;
