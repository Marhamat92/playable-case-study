const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController')


//!Get all todos
router.get('/list', protect, getTodos)
//!Get single todo
router.get('/:id', protect, getTodo)
//!Create a todo
router.post('/create', protect, createTodo)
//!Update a todo
router.put('/:id', protect, updateTodo)
//!Delete a todo
router.delete('/:id', protect, deleteTodo)
