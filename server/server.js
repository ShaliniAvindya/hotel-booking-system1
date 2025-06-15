const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./passport'); 
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); 
const bodyParser = require("body-parser");
const contactRoutes = require('./routes/contactRoutes'); 
const bookRoutes = require('./routes/bookingRoutes');

require('dotenv').config(); // Load environment variables from .env

const app = express();

// ✅ Body parsing
app.use(bodyParser.json());
app.use(express.json());

// ✅ Test health route
app.get('/', (req, res) => {
  res.send('Server is live!');
});

// ✅ CORS setup for local + production
const allowedOrigins = [
  'http://localhost:5173',
  'https://hotel-booking-system1-atgr.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Session handling
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
}));

// ✅ Passport init
app.use(passport.initialize());
app.use(passport.session());

// ✅ API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/notifications', notificationRoutes); 

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://harithmadu:myhoteldb@cluster0.klue1z8.mongodb.net/hotel-booking')
  .then(() => console.log('DB connect successful'))
  .catch((err) => console.error('DB connection error:', err));

// ✅ Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
