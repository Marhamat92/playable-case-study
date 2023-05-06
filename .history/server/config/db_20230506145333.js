const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,

    })
    console.log(`MongoDB Connected... ${conn.connection.host}`.magenta.underline.bold)
  }
  catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
}




module.exports = connectDB;