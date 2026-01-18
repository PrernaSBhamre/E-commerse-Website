const express = require('express');
const { register } = require('../controllers/register');
const { login, authenticate, logout } = require('../controllers/login');
const { forgotPassword, resetPassword } = require('../controllers/password');

const AsyncHandler = require('../middleware/AsyncHandler');
const validate = require('../middleware/validate');
const { registerSchema } = require('../Validator/authValidator');
const { loginSchema } = require('../Validator/loginSchema');
const router = express.Router();


router.post('/register', validate(registerSchema), AsyncHandler(register));
router.post('/login', validate(loginSchema), AsyncHandler(login));
router.post('/authenticate', AsyncHandler(authenticate));
router.post('/logout',AsyncHandler(logout));
router.post('/forgotpassword', AsyncHandler(forgotPassword));
router.put('/resetpassword/:token', AsyncHandler(resetPassword));
module.exports = router;




