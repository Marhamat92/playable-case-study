const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo, uploadImage } = require('../controllers/todoController')
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage });


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
//!Upload image
router.post('/upload', upload.single('image'), uploadImage)


module.exports = router