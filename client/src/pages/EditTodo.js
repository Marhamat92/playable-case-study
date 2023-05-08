import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTodoSlice } from '../features/todos/todoSlices'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTodoSlice } from '../features/todos/todoSlices'
import { useParams } from 'react-router-dom'
import { reset } from '../features/auth/authSlice'
import { logout } from '../features/auth/authSlice'
import { FaTasks, FaHome, FaUser, FaSignOutAlt, FaBell, FaCog } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { Link } from 'react-router-dom'
import AddTodo from '../components/modals/AddTodo'
import axios from 'axios'
import { toast } from 'react-toastify'






function EditTodo() {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { todo } = useSelector(state => state.todos)
  const { isSuccess, message } = useSelector(state => state.todos)
  const [isCompleted, setIsCompleted] = useState(false)
  const [todoEdit, setTodoEdit] = useState({
    title: '',
    tag: '',
    isCompleted: false,
    image: '',
  })

  const [showModal, setShowModal] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null)



  const handleChange = (e) => {
    setTodoEdit({
      //show previous values
      ...todoEdit,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let image = null
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
    let params = { ...todoEdit, isCompleted: isCompleted }
    if (image)
      params['image'] = image
    dispatch(updateTodoSlice({ ...todoEdit, isCompleted: isCompleted, _id: id, image: image }))
    setTodoEdit({
      title: '',
      tag: '',
      isCompleted: false,
      image: '',
    })

    if (isSuccess) {
      toast.success("Todo updated successfully")
    }
    navigate('/')
  }

  useEffect(() => {
    dispatch(getTodoSlice(id))
    return () => {
      dispatch(reset())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (todo) {
      setTodoEdit({
        title: todo.title,
        tag: todo.tag,
        isCompleted: todo.isCompleted,
        image: todo.image
      })
      setIsCompleted(todo.isCompleted)
    }
  }, [todo, setTodoEdit, setIsCompleted, updateTodoSlice])

  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])





  return (
    <div className='bg-[#987EFF]'>
      <div className='h-screen'>
        <div className='flex h-full'>
          <div className='container   mx-auto'>
            <div className='grid grid-cols-4 relative  py-4 h-full'>
              <div className='col-span-1 bg-white border-8 border-white rounded-l-md relative'>
                <div className='flex flex-col'>
                  <div className='flex justify-center items-center space-x-4 mt-4'>
                    <div
                      className='w-16 h-16 rounded-full bg-[#987EFF] flex justify-center items-center'
                    >
                      <FaTasks size={30} color='white' />
                    </div>
                    <h1 className='text-2xl font-medium text-[#828191]'>
                      Todo App
                    </h1>
                  </div>
                  <div className='flex flex-col mt-8 space-y-2'>
                    <Link
                      to='/'
                      className='flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#987EFF] hover:text-white'
                    >
                      <FaHome size={20} />
                      <span>Home</span>
                    </Link>
                    <Link
                      to='/'
                      className='flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[#987EFF] hover:text-white'
                    >
                      <FaUser size={20} />
                      <span>Profile</span>
                    </Link>

                  </div>
                </div>
              </div>
              <div className='col-span-3 bg-[#F7F8FD] rounded-r-md px-4 py-4'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-2xl font-medium text-[#828191]'>
                    Edit Todo
                  </h1>
                  <div className='flex items-center space-x-2'>
                    <FaBell size={20} />
                    <FaCog size={20} />
                  </div>
                </div>
                <div className='flex flex-col mt-8'>
                  <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input
                      type='text'
                      name='title'
                      value={todoEdit.title}
                      onChange={
                        handleChange
                      }
                      placeholder='Title'
                      className='border-2 border-gray-400 rounded-md p-2 mb-2'
                    />
                    <input
                      type='text'
                      name='tag'
                      value={todoEdit.tag}
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
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        name='isCompleted'
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                        className='border-2 border-gray-400 rounded-md p-2 mb-2'
                      />
                      <span>Completed</span>
                    </div>
                    <button
                      type='submit'
                      className='bg-[#987EFF] text-white px-4 py-2 rounded-md flex justify-center items-center space-x-2'
                    >
                      <MdAddTask size={20} />
                      <span>Update Todo</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditTodo