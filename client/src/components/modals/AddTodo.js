//create add todo modal component
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTodoSlice } from '../../features/todos/todoSlices'
import { MdAddTask } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { uploadImageSlice } from '../../features/todos/todoSlices'
import axios from 'axios'
import { toast } from 'react-toastify'

function AddTodo() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [todo, setTodo] = useState({
    title: '',
    tag: '',
    isCompleted: false,
    image: '',
  })

  const { isSuccess, message } = useSelector(state => state.todos)

  const [showModal, setShowModal] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null)

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    let image = ''
    if (selectedImage) {
      const formData = new FormData()
      formData.append('image', selectedImage)
      await axios.post('http://localhost:5000/todos/upload', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        image = res.data.image
      })

    }


    dispatch(createTodoSlice({ ...todo, image: image }))
    setShowModal(false)
    setTodo({
      title: '',
      tag: '',
      isCompleted: false,
      image: '',

    })
    if (isSuccess) {
      toast.success("Todo added successfully")
    }
    navigate('/')
  }

  return (
    <div className='flex justify-center items-center'>
      <button
        onClick={() => setShowModal(true)}
        className='bg-[#987EFF] text-white px-4 py-2 rounded-full flex justify-center items-center space-x-2'
      >
        <MdAddTask size={20} />
        <span>Add Todo</span>
      </button>
      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white w-1/2 h-1/2 rounded-md relative'>
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-1 right-1 bg-red-500 text-white p-2 rounded-full'
            >
              <FaTimes size={20} />
            </button>
            <form onSubmit={handleSubmit} className='flex flex-col p-4 mt-8'>
              <input
                type='text'
                name='title'
                value={todo.title}
                onChange={handleChange}
                placeholder='Title'
                className='border-2 border-gray-400 rounded-md p-2 mb-2'
              />
              <input
                type='text'
                name='tag'
                value={todo.tag}
                onChange={handleChange}
                placeholder='tag'
                className='border-2 border-gray-400 rounded-md p-2 mb-2'
              />
              <input
                //accept only images
                accept="image/*"
                type='file'
                name='image'
                onChange={(e) => setSelectedImage(e.target.files[0])}
                placeholder='Image'
                className='border-2 border-gray-400 rounded-md p-2 mb-2'
              />
              <button
                type='submit'
                className='bg-[#987EFF] text-white px-4 py-2 rounded-md'
              >
                Add Todo
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddTodo