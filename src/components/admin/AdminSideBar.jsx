import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdDashboardCustomize } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { TbVocabulary } from "react-icons/tb";
import UserAvatar from '../UserAvatar';


const AdminSideBar = () => {
  const navigate = useNavigate()
  const actionLogout = useAuthStore((state)=> state.actionLogout)

  const hdlLogout = () => {
    actionLogout();
    navigate('/')
  }

  const user = useAuthStore((state) => state.user);
  const firstLetter = user.user?.username ? user.user.username.charAt(0).toUpperCase() : '?';

  return (
    <div className='w-[20%] h-screen bg-white text-[#22A094] flex flex-col'>
      <div className='flex flex-col items-center'>
        <div className="flex items-center text-xl justify-center w-16 h-16 bg-[#22A094] text-white rounded-full">
          {firstLetter}
        </div>
      <h1 className='text-center text-2xl font-bold mt-1 mb-3'>Admin</h1>
      </div>
        <div className='flex flex-col h-[91vh]'>
            <div className='flex-grow'>
                <div>
                    <div className='text-lg hover:bg-[#e9e9e9] p-3 pl-10' onClick={() => navigate('/admin')}>
                        <span className='flex gap-1'>
                        <MdDashboardCustomize className='w-8 h-8' /> Dashboard
                        </span>
                    </div>
                    <div className='text-lg hover:bg-[#e9e9e9] p-3 pl-10' onClick={() => navigate('/admin/manages')}>
                        <span className='flex gap-1'>
                        <MdManageAccounts className='w-8 h-8' /> Manage User
                        </span>
                    </div>
                    <div className='text-lg hover:bg-[#e9e9e9] p-3 pl-10' onClick={() => navigate('/admin/vocabulary')}>
                        <span className='flex gap-1'>
                        <TbVocabulary className='w-8 h-8' /> Vocabulary
                        </span>
                    </div>
                </div>
            </div>

            <div className=''>
                <div className='text-lg hover:bg-[#e9e9e9] p-3 pl-10'>
                    <button className='flex gap-1'>
                    <IoSettingsOutline className='w-8 h-8' /> Setting
                    </button>
                </div>
                <div className='text-lg hover:bg-[#e9e9e9] p-3 pl-10'>
                    <button onClick={hdlLogout} className='flex gap-1'>
                    <IoLogOutOutline className='w-8 h-8' /> Logout
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminSideBar
