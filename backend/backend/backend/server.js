const express = require('express');
const { MongoClient } = require('mongodb');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const errorHandler = require('./middleware/errorhandle'); // Error handler middleware
require('./config/passport'); // Passport configuration

const app = express();

// MongoDB Connection URL
const uri = "mongodb+srv://udayreddi412:3dx9Ajl19StagWFd@hackathon.pst4d.mongodb.net/hackathon?retryWrites=true&w=majority&appName=hackathon";

// Connect to MongoDB
let db;
const connectDB = async () => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");
    db = client.db("hackathon"); // Specify the database name
  } catch (error) {
    console.error("Connection failed:", error.message);
    process.exit(1); // Exit the process with an error code
  }
};

// Middleware to inject database connection into requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Wait for DB Connection before starting the server
connectDB().then(() => {
  // Middleware
  app.use(express.json());

  // Configure CORS to allow only your frontend (add your actual frontend URL)
  const allowedOrigins = ['http://localhost:3000']; // Your frontend URL here
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    })
  );

  // Session Middleware
  app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
    })
  );

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // API Routes
  app.use('/api', userRoutes);
  app.use('/api', authRoutes); // Add auth routes

  // Error Handling Middleware
  app.use(errorHandler);

  // Start the Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
