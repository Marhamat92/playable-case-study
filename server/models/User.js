const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true, 'please add a name'
    ]
  },
  email: {
    type: String,
    required: [
      true,
      'please add an email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [
      true,
      'please add a password'
    ]
  }
},
  {
    timestamps: true
  }
)


module.exports = User = mongoose.model('user', UserSchema);