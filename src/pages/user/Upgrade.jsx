import React from 'react'
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router-dom';

const Upgrade = () => {
    const isDark = useAuthStore((state) => state.isDark);
    const navigate = useNavigate()
    return (
        <div className='pt-14'>
            <div className='flex flex-col items-center mt-40'>
                <div className='w-36'>
                    {isDark
                        ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
                        : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
                </div>
                <div className='w-32 h-32 mt-4'>
                    <img src="https://i.imgur.com/TSZvM6H.png" alt="" />
                </div>
                <div className='mt-4'>
                    <h1 className='text-3xl text-center'>ยกระดับประสบการณ์การเรียนรู้ของคุณ!</h1>
                    <h2 className='text-lg mt-6 mb-6'> เข้าถึงบทเรียนพิเศษ: เรียนรู้เพิ่มเติมด้วยคอร์สที่ออกแบบมาเฉพาะสำหรับสมาชิก Premium เท่านั้น!</h2>
                </div>
                <button onClick={()=>navigate('/user/upgrade/selectplan')}className='btn border-2 hover:bg-[#E2FAF8] dark:hover:bg-[#e7f4ef49] text-xl'>สมัครเป็นสมาชิก</button>
            </div>
        </div>
    )
}

export default Upgrade
