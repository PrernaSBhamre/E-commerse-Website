const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    try {
        const {email,password} = req.body;
        
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign(
                { id: user._id, username: user.name, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
    
            // Store JWT in session
            req.session.token = token;
            
            // Explicitly save the session
            req.session.save((err) => {
                if (err) {

                    return res.status(500).json({ error: 'Failed to save session' });
                }
                


                res.status(200).json({ message: 'Login successful', token });
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {

        res.status(500).json({ error: 'Internal server error during login' });
    }
};

module.exports.authenticate = async (req, res) => {
  try {
    // 1️⃣ Check session
    if (!req.session || !req.session.token) {
      return res.status(401).json({
        message: 'Not authenticated'
      });
    }

    // 2️⃣ Get JWT from session
    const token = req.session.token;

    // 3️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Send user data in response
    res.status(200).json({ user: decoded, authenticated: true });
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    // 1️⃣ Clear session
    req.session = null;

    // 2️⃣ Send response
    res.status(200).json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error during logout'
    });
  }
};


