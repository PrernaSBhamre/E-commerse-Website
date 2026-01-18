const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');

dotenv.config();

/* -------------------- DB CONNECTION -------------------- */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectDB();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));

/* -------------------- SESSION SETUP (MUST BE BEFORE ROUTES) -------------------- */
app.use(session({
  name: 'sessionId',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions',
    touchAfter: 24 * 3600 // Only save session if modified
  }),
  
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: false // true only in HTTPS
  }
}));

// Debug middleware to log session info
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session data:', req.session);
  next();
});

/* -------------------- ROUTES -------------------- */
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);

app.get('/', (req, res) => {
  res.send("hii");
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  // Prevent sending headers if they've already been sent
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  res.status(500).json({ message: err.message });
});

/* -------------------- SERVER -------------------- */
app.listen(5000, () => {
  console.log("Backend running on 5000 port");
});
