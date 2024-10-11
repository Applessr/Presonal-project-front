import React from 'react';
import { CgProfile } from "react-icons/cg";
import { MdDashboardCustomize, MdManageAccounts } from "react-icons/md";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { TbVocabulary } from "react-icons/tb";
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router-dom';

const AdminSideBar = () => {
  const navigate = useNavigate();
  const actionLogout = useAuthStore((state) => state.actionLogout);

  const hdlLogout = () => {
    actionLogout();
    navigate('/');
  };

  const user = useAuthStore((state) => state.user);
  const firstLetter = user.user?.username ? user.user.username.charAt(0).toUpperCase() : '?';

  return (
    <div className='w-[20%] bg-white pt-20 dark:bg-[#2C2C2A] dark:text-[#e7f4ef] text-[#22A094] flex flex-col'>
      <div className='flex flex-col items-center py-4'>
        <div className="flex items-center text-xl justify-center w-16 h-16 bg-[#22A094] text-white rounded-full">
          {firstLetter}
        </div>
        <h1 className='text-center text-2xl font-semibold mt-1 mb-3'>Admin, {user.user.username}</h1>
      </div>
      <div className='flex-grow flex flex-col'>
        <div className='flex-grow'>
          <div className='text-lg hover:bg-[#e9e9e9]  dark:hover:bg-[#4b4b4b] p-3 pl-10 cursor-pointer' onClick={() => navigate('/admin')}>
            <span className='hover:scale-105 flex gap-1'>
              <MdDashboardCustomize className=' w-8 h-8' /> Dashboard
            </span>
          </div>
          <div className='text-lg hover:bg-[#e9e9e9] dark:hover:bg-[#4b4b4b] p-3 pl-10 cursor-pointer' onClick={() => navigate('/admin/manages')}>
            <span className='hover:scale-105  flex gap-1'>
              <MdManageAccounts className='w-8 h-8' /> Manage User
            </span>
          </div>
          <div className='text-lg hover:bg-[#e9e9e9] dark:hover:bg-[#4b4b4b] p-3 pl-10 cursor-pointer' onClick={() => navigate('/admin/vocabulary')}>
            <span className='flex hover:scale-105  gap-1'>
              <TbVocabulary className='w-8 h-8' /> Vocabulary
            </span>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-lg hover:bg-[#e9e9e9] dark:hover:bg-[#4b4b4b] p-3 pl-10'>
            <button onClick={() => navigate('/user/user-edit-profile')} className='flex gap-1 hover:scale-105'>
              <IoSettingsOutline className='w-8 h-8' /> Setting
            </button>
          </div>
          <div className='text-lg hover:bg-[#e9e9e9] dark:hover:bg-[#4b4b4b] p-3 pl-10'>
            <button onClick={hdlLogout} className='flex gap-1 hover:scale-105'>
              <IoLogOutOutline className='w-8 h-8' /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;