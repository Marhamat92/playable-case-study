import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";



function TodoItem({ todo }) {



  return (
    <>
      <div className='flex'>
        <div className='w-1/2 bg-white h-12 px-4  flex justify-between my-2 border rounded-md items-center'>
          <div className='flex items-center space-x-2'>
            <image
              id='image'
              src='https://img.freepik.com/free-vector/hand-drawn-business-planning-with-task-list_23-2149164275.jpg?q=10&h=200' className='bg-red-500 w-8 h-8 rounded-full' />
            <p className='text-lg font-medium text-[#828191]'> {todo}</p>
          </div>

          <div className='flex items-center space-x-2'>
            <AiFillDelete className=' text-2xl text-red-500 cursor-pointer' />
            <MdEditSquare className=' text-2xl text-[#987EFF] cursor-pointer' />
            <input checked={true} type="checkbox" className='checkbox h-5 w-5 border-2 border-[#987EFF] rounded-md bg-[#987EFF] text-[#987EFF] cursor-pointer
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