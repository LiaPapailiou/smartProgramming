const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use(cookieParser());


app.use('/clients', require('./routes/clients'));
app.use('/user', require('./routes/user'));
app.use('/exercises', require('./routes/exercises'));
app.use('/exercise-library', require('./routes/exerciseLog'));
app.use('/programs', require('./routes/programsNew'));
app.use('/auth', require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
};



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));