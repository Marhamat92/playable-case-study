import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='bg-[#987EFF]'>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='flex flex-col items-center justify-center py-6 px-6 bg-white rounded-2xl'>
          <h1 className='text-4xl font-bold text-[#987EFF]'>Register</h1>
          <form className='flex flex-col items-center justify-center w-full h-full'>
            <input className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none' type='text' placeholder='Username' />
            <input className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none' type='email' placeholder='Email' />
            <input className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none' type='password' placeholder='Password' />
            <input className='w-3/4 h-12 px-4 mt-8 text-xl border-2 border-[#987EFF] rounded-2xl focus:outline-none' type='password' placeholder='Confirm Password' />
            <button className='w-3/4 h-12 mt-8 text-xl font-bold text-white bg-[#987EFF] rounded-2xl focus:outline-none'>Register</button>
            <p className='
              flex flex-row   justify-center w-3/4 h-12 mt-8 text-xl text-center
            '>
              Already have an account? <Link className='text-[#987EFF]' to='/login'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register