import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoSlice, getTodosSlice, reset } from '../../features/todos/todoSlices';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { updateTodoSlice } from '../../features/todos/todoSlices';
import { useEffect } from 'react';
import { toast } from 'react-toastify';







function TodoItem({ todo }) {

  const { isSuccess, message, todos } = useSelector(state => state.todos)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isCompleted, setIsCompleted] = useState(false)

  const handleDelete = (id) => {
    dispatch(deleteTodoSlice(id))
    navigate('/')

    if (isSuccess) {
      toast.success("Todo deleted successfully")
    }

  }


  useEffect(() => {
    dispatch(getTodosSlice())
    return () => {
      dispatch(reset())
    }
  }, [dispatch, isSuccess, message, todos])




  const handleChange = async (e) => {
    setIsCompleted(e.target.checked)
    await dispatch(updateTodoSlice({ ...todo, isCompleted: e.target.checked }))
  }

  useEffect(() => {
    setIsCompleted(todo.isCompleted)
  }, [todo.isCompleted, setIsCompleted, updateTodoSlice, deleteTodoSlice])








  return (
    <>
      <div className='flex'>
        <div className='w-1/2 bg-white h-12 px-4  flex justify-between my-2 border rounded-md items-center'>
          <div className='flex items-center space-x-2'>
            <a href={'http://localhost:5000/data/uploads/' + todo.image}

            >
              <img alt={todo.image} src={'http://localhost:5000/data/uploads/' + todo.image} onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
              }} className='w-8 h-8 rounded-full' />
            </a>
            <p className='text-lg font-medium text-[#828191]'> {todo.title}</p>
          </div>

          <div className='flex items-center space-x-2'>
            <AiFillDelete
              onClick={() => handleDelete(todo._id)}
              className=' text-2xl text-red-500 cursor-pointer' />
            <MdEditSquare
              onClick={() => navigate(`/edit/${todo._id}`)}
              className=' text-2xl text-[#987EFF] cursor-pointer' />


            <input
              onChange={handleChange}
              checked={isCompleted}
              type="checkbox" className='checkbox h-5 w-5 border-2 border-[#987EFF] rounded-md bg-[#987EFF] text-[#987EFF] cursor-pointer
            focus:outline-none ' />
          </div>
        </div>
        <div className='flex'>



        </div>
      </div>

    </>
  )
}

export default TodoItem