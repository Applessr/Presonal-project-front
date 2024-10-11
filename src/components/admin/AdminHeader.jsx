import React from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../UserAvatar'
import UserDropdown from '../user/UserDropdown'
import Dropdown from '../guest/Dropdown'
import DarkTheme from '../DarkTheme'
import useAuthStore from '../../store/auth-store'

const AdminHeader = () => {
  const isDark = useAuthStore((state) => state.isDark);
  return (
    <div className='flex fixed w-full bg-white dark:bg-[#2C2C2A] dark:text-[#e7f4ef]'>
      <div className=' w-full items-center h-16'>
        <div className='mx-16 flex justify-between mt-1'>
          <div className='w-36 overflow-hidden self-center'>
            {isDark
              ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
              : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
          </div>
          <nav className='flex gap-8 items-center mt-1'>
            <DarkTheme />
            <Link className='dark:hover:text-[#b0dfd1]' to='/user'>แปลภาษา</Link>
            <Dropdown />
            <UserDropdown />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
