import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { useSelector, useDispatch } from 'react-redux'
import { getTodosSlice, reset } from '../../features/todos/todoSlices'
import { useNavigate } from 'react-router-dom'



function TodoList({ todos }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getTodosSlice())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])


  const renderedTodos = todos.length > 0 && todos?.map((todo) => {
    return <TodoItem todo={todo} key={todo._id} />
  })


  return (
    <div className='
       
    '>
      {renderedTodos}
    </div>
  )
}

export default TodoList