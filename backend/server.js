const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line to import the 'path' module
require('dotenv').config(); // Load environment variables
const { setupCronJobs } = require('./utils/cronjobs'); // Import the setupCronJobs function
setupCronJobs(); // Call the setupCronJobs function to schedule the cron job
const fs = require('fs'); // Add this at the top with other requires
const multer = require("multer"); // Add this line to import multer

// Import Routes
const loginRoutes = require('./routes/secondlogin');
const registrationRoutes = require('./routes/registrationRoutes');
const hackathon_submissionroutes = require('./routes/hackathon_submission');
const participationRoutes = require('./routes/participation');
const CollegeHackathonHostingRoutes = require('./routes/CollegeHackathonHosting');
const authRoutes = require('./routes/hoster_homepage');
const certificateRoutes = require('./routes/certificateRoutes');
const uploadRoutes = require("./routes/uploadRoutes");
const scoreRoutes = require('./routes/scoreRoutes');
const CollegeSignupLoginRoutes = require('./routes/CollegeSignupLoginRoutes');
const contactRoutes = require('./routes/contactRoutes');
const milestoneRoutes = require('./routes/milestone');


const app = express();
app.use(cors());

const uploadPath = 'uploads/profile-pictures';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/api/auth/upload-profile-picture", upload.single("profilePicture"), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; // Full URL
  res.json({ profilePictureUrl: imageUrl });
});


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Add this after your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      message: 'Validation Error',
      errors: err.errors 
    });
  }
  res.status(500).json({ message: 'Internal Server Error' });
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Shut down gracefully in case of a connection error
  });

// Increase request body size limit (100MB)
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Route Definitions
app.use('/api/auth', loginRoutes); // Auth routes (secondlogin) for student login              # LOGIN COUNT IN STUDENT DETAIALS
app.use('/api/registration', registrationRoutes); //  student hackathon registrations in student dashboard
app.use('/api/hackathon', hackathon_submissionroutes); // Hackathon routes for hackathon submission student dashboard # SUBMISSION COUNT IN COLLEGE DASHBOARD
app.use('/api', participationRoutes); // Participation routes for student participation in hackathon student dashboard
app.use('/hackathon', CollegeHackathonHostingRoutes); //hosting hackathon in home page
app.use('/api/hoster', authRoutes); // Auth routes (hoster_homepage) for hoster login           # ORGAINISERS COUNT IN COLLEGE DASHBOARD
app.use("/api/certificates", certificateRoutes);
app.use("/api", uploadRoutes);
app.use('/api/registration', scoreRoutes);   // SCOREBOARD COUNT IN COLLEGE DASHBOARD
app.use('/api/college' , CollegeSignupLoginRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', milestoneRoutes);


// Default Route for 404 Errors
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Add error handling middleware at the end
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// Server Listening
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv').config();
// const { setupCronJobs } = require('./utils/cronjobs');
// setupCronJobs();
// const fs = require('fs');
// const multer = require("multer");

// // Import Routes
// const loginRoutes = require('./routes/secondlogin');
// const registrationRoutes = require('./routes/registrationRoutes');
// const hackathon_submissionroutes = require('./routes/hackathon_submission');
// const participationRoutes = require('./routes/participation');
// const CollegeHackathonHostingRoutes = require('./routes/CollegeHackathonHosting');
// const authRoutes = require('./routes/hoster_homepage');
// const certificateRoutes = require('./routes/certificateRoutes');
// const uploadRoutes = require("./routes/uploadRoutes");
// const scoreRoutes = require('./routes/scoreRoutes');
// const CollegeSignupLoginRoutes = require('./routes/CollegeSignupLoginRoutes');

// const app = express();
// app.use(cors()); 

// const uploadPath = 'uploads/profile-pictures';
// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// app.post("/api/auth/upload-profile-picture", upload.single("profilePicture"), (req, res) => {
//   if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//   }
//   const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
//   res.json({ profilePictureUrl: imageUrl });
// });

// // Middleware
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));
// // console.log("JWT_SECRET:", process.env.JWT_SECRET);

// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => {
//     console.error('MongoDB connection error:', error.message);
//     process.exit(1);
//   });

// // Increase request body size limit (100MB)
// app.use(express.json({ limit: "100mb" }));
// app.use(express.urlencoded({ limit: "100mb", extended: true }));

// // Route Definitions
// app.use('/api/auth', loginRoutes);
// app.use('/api/registration', registrationRoutes);
// app.use('/api/hackathon', hackathon_submissionroutes);
// app.use('/api', participationRoutes);
// app.use('/hackathon', CollegeHackathonHostingRoutes);
// app.use('/api/hoster', authRoutes);
// app.use("/api/certificates", certificateRoutes);
// app.use("/api", uploadRoutes);
// app.use('/api/registration', scoreRoutes);
// app.use('/api/college' , CollegeSignupLoginRoutes);

// // Default Route for 404 Errors
// app.use((req, res) => {
//   res.status(404).json({ message: 'Endpoint not found' });
// });

// // Add error handling middleware at the end
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: err.message || 'Something went wrong!' });
// });

// // Server Listening
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



