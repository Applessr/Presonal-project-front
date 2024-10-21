import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../guest/Dropdown'
import UserDropdown from './UserDropdown';
import DarkTheme from '../DarkTheme';
import useAuthStore from '../../store/auth-store';
import { IoDiamond } from "react-icons/io5";

const UserNav = () => {
  const isDark = useAuthStore((state) => state.isDark);
  const navigate = useNavigate()

  return (
    <div className='flex w-full fixed bg-white z-10 dark:bg-[#2C2C2A] dark:text-[#e7f4ef] '>
      <div className='w-full items-center h-14'>
        <div className='mx-24 flex justify-between'>
          <div className='w-36 overflow-hidden self-center'>
            {isDark
              ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
              : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
          </div>
          <nav className='flex gap-8 items-center mt-1'>
            <DarkTheme />
            <Link to='/user'>แปลภาษา</Link>
            <Dropdown />
            <button onClick={()=>navigate('/user/upgrade')} className=" bg-gradient-to-r from-pink-500 to-yellow-500  py-2 px-4 rounded transition duration-300 hover:from-yellow-500 hover:to-pink-500">
              <span className='flex gap-1 text-white font-semibold items-center'><IoDiamond className='w-5 h-5' /> Premium</span>
            </button>
            <UserDropdown />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserNav;