import React from 'react'
import { Outlet } from 'react-router-dom'
import GuestNav from '../components/guest/GuestNav'

const GuestLayout = () => {
  return (
    <div>
      <GuestNav/>
      <Outlet/>
    </div>
  )
}

export default GuestLayout
