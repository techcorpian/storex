import React from 'react'
import { MdError } from "react-icons/md";
import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <div className='text-9xl text-gray-300'><MdError/></div>
        <div className='text-7xl font-semibold text-gray-400'>Error 404 !</div>
        <div className='text-xl font-light text-gray-400'>Page Not Found In Storex</div>
        <Link to='/' className='mt-6 bg-sky-900 text-white py-2 px-6 rounded-full hover:shadow-lg'> Back to Home Page</Link>
    </div>
  )
}

export default ErrorPage