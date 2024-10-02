import React from 'react'
import UserNav from '../components/user/UserNav'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
      <UserNav/>
      <Outlet/>
    </div>
  )
}

export default UserLayout
