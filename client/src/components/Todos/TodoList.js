import React from 'react'
import TodoItem from './TodoItem'


function TodoList({ todos }) {
  return (
    <>
      {todos.map((todo, index) => {
        return (
          <TodoItem key={index} todo={todo} />
        )
      }
      )}
    </>
  )
}

export default TodoList