import React from 'react'
import AdminHeader from '../components/admin/AdminHeader'
import AdminSideBar from '../components/admin/AdminSideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='h-screen flex flex-col overflow-hidden'> 
        <div>
            <AdminHeader />
        </div>
        <div className='flex flex-grow overflow-hidden'> 
            <AdminSideBar />
            <div className='flex-grow flex justify-center items-center overflow-hidden'> 
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default AdminLayout;