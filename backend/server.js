const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Import Routes
const loginRoutes = require('./routes/secondlogin');
const registrationRoutes = require('./routes/registrationRoutes');
const teamRoutes = require('./routes/teamRoutes');
const adminRoutes = require('./routes/admin');
const hackathonRoutes = require('./routes/hackathons');
// const authRoutes = require('./routes/authRoutes'); // Uncomment if you use auth routes

const app = express();
app.use(cors()); // Enable CORS for cross-origin requests

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json()); // Built-in middleware for body parsing (if needed)

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Shut down gracefully in case of a connection error
  });

// Route Definitions
app.use('/api/auth', loginRoutes); // Auth routes (secondlogin)
app.use('/api/registration', registrationRoutes); // Registration routes
app.use('/api/team', teamRoutes); // Team routes
app.use('/admin', adminRoutes); // Admin routes
app.use('/hackathons', hackathonRoutes); // Hackathon routes
// app.use('/api/auth', authRoutes); // Uncomment when using separate auth routes

// Default Route for 404 Errors
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Server Listening
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





















// const express = require('express');
// const mongoose = require('mongoose');
// // const authRoutes = require('./routes/authRoutes');
// const login = require("./controllers/userController")

// const app = express();

// // Middleware
// app.use(express.json());

// // Connect to MongoDB
// // const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://udayreddi412:3dx9Ajl19StagWFd@hackathon.pst4d.mongodb.net/hackathon?', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     writeConcern: { w: 1 } // Use a basic write concern (acknowledge writes by at least one replica)
// })
//     .then(() => console.log('Database connected successfully'))
//     .catch((error) => console.log('Database connection error:', error));


// // Use authentication routes
// // app.use('/api/auth', authRoutes);
// app.use('/api/auth',login)

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


