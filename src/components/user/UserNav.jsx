import { Link } from 'react-router-dom';
import Dropdown from '../guest/Dropdown'
import UserDropdown from './UserDropdown';
import DarkTheme from '../DarkTheme';
import useAuthStore from '../../store/auth-store';

const UserNav = () => {
  const isDark = useAuthStore((state) => state.isDark);

  return (
    <div className='flex w-full fixed bg-white dark:bg-[#2C2C2A] dark:text-[#e7f4ef] '>
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
            <UserDropdown />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserNav;