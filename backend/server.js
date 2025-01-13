const express = require('express');
const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const login = require('./routes/secondlogin');
const registrationRoutes = require('./routes/registrationRoutes'); // Add this line
const teamRoutes = require('./routes/teamRoutes'); // Add this line
const adminRoutes = require('./routes/admin');
const hackathonRoutes = require('./routes/hackathons');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/auth',login);
app.use('/api/registration', registrationRoutes);
app.use('/api/team', teamRoutes);
app.use('/admin', adminRoutes);
app.use('/hackathons', hackathonRoutes);

// Server Listening
const PORT = process.env.PORT || 5001;
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


