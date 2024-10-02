import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Login from '../../pages/auth/Login';

const GuestNav = () => {
  return (
    <div className='flex w-full fixed bg-white'>
      <div className=' w-full shadow-md items-center h-14'>
        <div className='mx-24 flex justify-between mt-1'>
          <div className='w-36 overflow-hidden self-center'>
            <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
          </div>
          <nav className='flex gap-8 items-baseline mt-1 text-[#22A094]'>
            <Link to='/'> แปลภาษา </Link>
            <Dropdown />
            <Login />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default GuestNav
