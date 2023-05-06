const express = require('express');
const app = express();
const colors = require('colors');
require('dotenv').config();



const hello = () => {
  console.log('hello this backend')
}

hello()

// cors
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));


const corsOptions = {
  origin: 'http://localhost:5000',
  optionsSuccessStatus: 200,
  origin: true,
  credentials: true
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`.cyan.underline.bold);
})