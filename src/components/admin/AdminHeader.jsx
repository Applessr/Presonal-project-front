import React from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../UserAvatar'
import UserDropdown from '../user/UserDropdown'

const AdminHeader = () => {
  return (
    <div className='flex w-full'>
      <div className=' w-full items-center h-14'>
        <div className='mx-16 flex justify-between mt-1'>
          <div className='w-36 overflow-hidden self-center'>
            <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
          </div>
          <nav className='flex gap-8 items-baseline mt-1 text-[#22A094]'>
            <UserDropdown/>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
