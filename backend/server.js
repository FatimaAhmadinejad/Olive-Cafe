const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



// Routes
const menuRoutes = require('./routes/menu');
const authRoutes = require('./routes/auth');

app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);

// اتصال به MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('MyCafe API is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});