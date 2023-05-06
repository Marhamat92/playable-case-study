const Todo = require('../models/Todo');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');


//@ desc Get all todos
//@route GET /todo/list
//@access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ author: req.user.id });
  res.json(todos);
});



//@ desc Get single todo
//@route GET /todo/:id
//@access Private
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //make sure logged in user is todo owner
  if (todo.author.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  if (todo) {
    res.json(todo);
  }
  else {
    res.status(404)
    throw new Error('Todo not found')
  }
});


//@ desc Create a todo
//@route POST /todo/create
//@access Private
//upload todo image to uploads folder

const createTodo = asyncHandler(async (req, res) => {
  const { title, tags, image } = req.body;

  const todo = await Todo.create({
    title: title,
    tags: tags,
    image: image,
    isCompleted: false,
    author: req.user.id
  })
  if (todo) {
    res.status(201).json(todo)
  } else {
    res.status(400)
    throw new Error('Invalid todo data')
  }
});


//@ desc Update a todo
//@route PUT /todo/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404)
    throw new Error('Todo not found')
  }

  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (todo.author.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  res.status(200).json(updateTodo)
});


//@ desc Delete a todo
//@route DELETE /todo/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404)
    throw new Error('Todo not found')
  }

  if (!req.user) {
    res.status(404)
    throw new Error('User not found')
  }

  if (todo.author.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  await todo.remove()
  res.status(200).json({ message: 'Todo removed' })
}
);


module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
}





