import { Link } from 'react-router-dom';
import Dropdown from '../guest/Dropdown'
import UserDropdown from './UserDropdown';

const UserNav = () => {

  return (
    <div className='flex w-full fixed bg-white'>
      <div className='w-full items-center h-14'>
        <div className='mx-24 flex justify-between'>
          <div className='w-36 overflow-hidden self-center'>
            <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
          </div>
          <nav className='flex gap-8 items-baseline mt-1 text-[#22A094]'>
            <Link to='/user'>แปลภาษา</Link>
            <Dropdown />
            <UserDropdown/>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserNav;