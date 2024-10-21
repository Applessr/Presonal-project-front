import { Link } from 'react-router-dom';
import Dropdown from '../guest/Dropdown'
import DarkTheme from '../DarkTheme';
import useAuthStore from '../../store/auth-store';
import SubscriptDropdown from './SubscriptDropdown';


const SubscriptionNav = () => {

    const isDark = useAuthStore((state) => state.isDark);


    return (
<div className='bg-gradient-to-r from-[#E2FAF8] via-[#82D1A5] to-[#239EAB] flex w-full fixed bg-[#E2FAF8] dark:bg-gradient-to-r z-10 dark:from-[#211F2F] dark:to-[#918CA9] dark:text-[#e7f4ef]'>
            <div className='w-full items-center h-14'>
                <div className='mx-24 flex justify-between'>
                    <div className='flex items-center'>
                        <div className='w-36 overflow-hidden self-center'>
                            {isDark
                                ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
                                : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
                        </div>
                        <span className='text-xl font-semibold'>Premium</span>
                    </div>
                    <nav className='flex gap-8 items-center mt-1 text-white'>
                        <DarkTheme />
                        <Link to='/subscript'>แปลภาษา</Link>
                        <Dropdown />
                        <SubscriptDropdown />
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionNav
