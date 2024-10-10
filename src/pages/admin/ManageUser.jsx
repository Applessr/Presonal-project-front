import React, { useEffect } from 'react';
import UserTable from '../../components/admin/UserTable';

const ManageUser = () => {

  return (
    <div className='bg-[#E2FAF8] h-screen w-screen flex flex-col items-center'>
      <h1 className='text-2xl my-6 pt-12'>User information</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <UserTable/>
      </div>
    </div>
  )
}

export default ManageUser
