const User=require('../schemas/user');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports.login=async(req,res)=>{
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Create JWT
        const token = jwt.sign(
            { id: user._id, username: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        // Store JWT in session
        req.session.token = token;
        //store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
