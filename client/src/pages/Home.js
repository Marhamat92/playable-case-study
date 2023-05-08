import React, { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import TodoList from "../components/Todos/TodoList";
import { MdAddTask } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { reset, logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import AddTodo from "../components/modals/AddTodo";
import { getTodosSlice, updateTodoSlice } from "../features/todos/todoSlices";




function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const { todos } = useSelector(state => state.todos)


  useEffect(() => {
    dispatch(getTodosSlice())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])


  const logOut = async () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
    window.location.reload()
  }


  //show todos which have tag that user clicked on it
  const [filteredTodos, setFilteredTodos] = useState([])
  const [tag, setTag] = useState('')

  useEffect(() => {
    setFilteredTodos(todos.length > 0 && todos.filter(todo => todo.tag === tag))
  }, [tag, todos])


  //search by title 
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  useEffect(() => {
    const results = todos.length > 0 && todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);




  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

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
                      className='w-24 h-24  bg-[#987EFF] rounded-full  first-letter:
                    text-4xl font-bold text-white flex justify-center items-center'
                    >
                      {user && user.name[0].toUpperCase()}
                    </div>

                    <div className='flex flex-col'>
                      <h1 className='text-2xl font-bold text-[#987EFF]'>
                        {user && user.name}
                      </h1>
                      <h1 className='text-xl font-bold text-[#987EFF]  '>
                        {user && user.email}
                      </h1>
                    </div>
                  </div>
                  <div className='bg-[#987EFF] h-1 mx-6 mt-6'></div>
                  <div className='mt-10'>
                    <div className='flex items-center'>
                      <FaTasks className='w-6 h-6 text-[#987EFF] ml-6' />
                      <div className='w-1/2 h-12 px-4 text-xl font-bold text-[#828191] flex justify-center items-center'>
                        Today Tasks
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 overflow-auto h-96'>
                    {/* filter todos tag and show them here */}
                    {
                      todos.length > 0 && todos?.map((todo) => {
                        return <div className='flex items-center justify-center    '>
                          <button
                            onClick={
                              () => {
                                setTag(todo.tag)
                              }
                            }
                            className=' px-4 py-2 rounded-md text-sm bg-[#987EFF] justify-center items-center mt-1   text-white'>
                            {todo.tag}
                          </button>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div
                  className='absolute bottom-0 left-0 first-letter:
             
             '
                >
                  <button
                    className='flex items-center
               '   onClick={logOut}
                  >
                    <BiLogOut className='w-12 h-12  text-[#987EFF] ' />
                  </button>
                </div>
              </div>
              <div className='col-span-3 bg-[#987EFF] border-8 rounded-r-md border-white overflow-auto'>
                <div className="flex flex-col mx-6">
                  <div className="flex justify-between">
                    <h1 className=" 
                    text-4xl font-bold text-white mt-6
                  ">
                      Today Main Focus
                    </h1>
                    <input type="search"
                      className="w-1/2 h-10 px-4 rounded-md text-xl font-bold text-[#828191] flex justify-center items-center mt-6 bg-white"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}

                    />
                    <button>
                      <AddTodo

                      />
                    </button>
                  </div>

                  <div className="mt-10">
                    <TodoList
                      //show todos for any case and then filter them by tag and search
                      todos={searchTerm.length < 1 ? filteredTodos.length < 1 ? todos : filteredTodos : searchResults}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
