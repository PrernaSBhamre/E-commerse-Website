const crypto = require('crypto');
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        
        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Hash token for storage (security best practice)
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        
        // Set token and expiration on user document
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        
        await user.save();
        
        // In a real application, you would send an email here with the reset link
        // Example: send email with link like: http://yoursite.com/reset-password/${resetToken}
        
        // In a real application, you would send an email here with the reset link
        // Example: send email with link like: http://yoursite.com/reset-password/${resetToken}
        
        // For now, we'll just send the token in the response (in development only)
        res.status(200).json({
            message: 'Password reset email sent',
            resetToken: resetToken // This would normally go in an email
        });
        
    } catch (error) {

        return res.status(500).json({
            message: 'Internal server error during password reset'
        });
    }
};

module.exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        
        // Hash token to compare with stored token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        
        // Find user with matching reset token and not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        
        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired reset token'
            });
        }
        
        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Update user's password
        user.password = hashedPassword;
        
        // Clear the reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save();
        
        res.status(200).json({
            message: 'Password reset successful'
        });
        
    } catch (error) {

        return res.status(500).json({
            message: 'Internal server error during password reset'
        });
    }
};
