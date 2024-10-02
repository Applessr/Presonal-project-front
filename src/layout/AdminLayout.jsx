import React from 'react'
import AdminHeader from '../components/admin/AdminHeader'
import AdminSideBar from '../components/admin/AdminSideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <div>
            <AdminHeader/>
        </div>
        <div className='flex'>
            <AdminSideBar/>
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout
