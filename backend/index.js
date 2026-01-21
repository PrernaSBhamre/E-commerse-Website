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
const reviewRoute = require('./routes/review');

dotenv.config();

/* -------------------- DB CONNECTION -------------------- */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    
    // Run product data initialization
    const initializeProductData = require('./initializeProductData');
    initializeProductData();
  } catch (error) {

  }
};
connectDB();

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // frontend URLs
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


/* -------------------- ROUTES -------------------- */
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/reviews', reviewRoute);

app.get('/', (req, res) => {
  res.send("hii");
});

/* -------------------- ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  // Prevent sending headers if they've already been sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ message: err.message });
});

/* -------------------- SERVER -------------------- */
app.listen(5000, () => {

});
