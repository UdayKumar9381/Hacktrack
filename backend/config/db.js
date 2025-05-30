const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://udayreddi412:3dx9Ajl19StagWFd@hackathon.pst4d.mongodb.net/hackathon?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database connected successfully');
});
