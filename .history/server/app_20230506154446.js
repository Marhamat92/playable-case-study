const express = require('express');
const app = express();
const colors = require('colors');
require('dotenv').config();
const cors = require('cors');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

//connect db
connectDB();

const loginRouter = require('./routes/loginRoutes');

const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200,
  origin: true,
  credentials: true
}

const hello = () => {
  console.log('hello this backend')
}

hello()

// cors
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
app.use('/api/users', loginRouter);
app.use(errorHandler); //error handler middleware to override the default express error handler



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.cyan.underline.bold);
})