const User = require('../schemas/user');
const bcrypt=require('bcrypt')
module.exports.register = async (req, res) => {
    try {
        const { name, email, password, role, address } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        //hashing the password
        const hash = await bcrypt.hash(password, 10);
        
        user = new User({
            name,
            email,
            password: hash,
            role,
            address
        });
    
        await user.save();

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
