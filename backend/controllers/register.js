const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../schemas/user');


module.exports.register = async (req, res) => {
    try {
        const { name, email, password, role, address, createdAt } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            });
        }
        
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Store the hashed password
            role,
            address,
            createdAt
        });
        

        
        if (user) {
            res.status(201).json({
                message: "User created successfully",
                userId: user._id
            });
        } else {
            res.status(400).json({
                message: "User creation failed"
            });
        }
    } catch (error) {

        res.status(500).json({
            message: "Server error during user registration",
            error: error.message
        });
    }
};