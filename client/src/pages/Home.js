import React from "react";
import { FaTasks } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import TodoList from "../components/Todos/TodoList";
import { MdAddTask } from "react-icons/md";

//create todos component with a list of todos and user name and email and a button to add a todo and a button to delete a todo and a button to edit a todo
function Home() {

  const todos = ["Go homw", "clean house", "Shopping"];


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
                      HM
                    </div>

                    <div className='flex flex-col'>
                      <h1 className='text-2xl font-bold text-[#987EFF] text-center'>
                        Username
                      </h1>
                      <h1 className='text-xl font-bold text-[#987EFF]'>
                        Email
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
                  <div className='mt-4'>
                    {["Personal", "Work", "Shopping"].map((item, index) => {
                      return (
                        <div key={index} className='flex items-center'>
                          <div className='w-6 h-6 ml-6'></div>
                          <div className='w-1/2 h-12 px-4 text-lg font-medium text-[#828191] flex justify-center items-center'>
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className='absolute bottom-0 left-0 first-letter:
             
             '
                >
                  <button
                    className='flex items-center
               '
                  >
                    <BiLogOut className='w-12 h-12  text-[#987EFF] ' />
                  </button>
                </div>
              </div>
              <div className='col-span-3 bg-[#987EFF] border-8 rounded-r-md border-white'>
                <div className="flex flex-col mx-6">
                  <div className="flex justify-between">
                    <h1 className=" 
                    text-4xl font-bold text-white mt-6
                  ">
                      Today Main Focus
                    </h1>
                    <button >
                      <MdAddTask className="text-4xl font-bold text-white" />
                    </button>
                  </div>

                  <div className="mt-10">
                    <TodoList todos={todos} />
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
