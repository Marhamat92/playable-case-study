const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  author:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
  ,
  title: {
    type: String,
    required: [
      true, 'please add a title'
    ]
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    required: [
      true,
      'please add a tag'
    ]
  },
  image: {
    type: String,
    required: [
      true,
      'please add a image'
    ]
  },
},
  {
    timestamps: true
  }
)


module.exports = Todo = mongoose.model('todo', TodoSchema);