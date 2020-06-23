const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(express.json({ extended: false }));

app.use('/clients', require('./routes/clients'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));