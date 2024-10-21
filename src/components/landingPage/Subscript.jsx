import React, { useEffect } from 'react'
import useAuthStore from '../../store/auth-store';
import SubscriptModal from '../subscription/Subscriptmodal';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";


const Subscript = () => {
    const user = useAuthStore((state) => state.user);
    const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus);
    const navigate = useNavigate()


    const hdlLearnMore = () => {
        if (!user) {
            document.getElementById('login_modal').showModal();
        }
        else if (!subscriptionStatus) {
            document.getElementById('subscript_modal').showModal();
        } else {
            navigate('/subscript/video');
        }
    }
    const hdlLessonClick = (where) => {
        if (!user) {
            document.getElementById('login_modal').showModal();
        } else if (!subscriptionStatus) {
            document.getElementById('subscript_modal').showModal();
        } else {
            navigate(`/subscript/${where}`);
        }
    }


    return (
        <div className='flex flex-col mb-14 '>
            <div className='flex justify-center gap-8'>
                <div className='flex gap-8 justify-center '>
                    <motion.div
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.3 }}
                        onClick={() => hdlLessonClick('greetings')}
                        className=' hover:cursor-pointer shadow-md bg-[#faebb4] hover:bg-[#faebb4b6] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg
                    dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]
                   '
                    >
                        <div className='w-[15rem] h-[15rem] overflow-hidden mt-8 rounded-lg bg-slate-200'>
                            <img
                                className='w-full h-full object-cover'
                                src='https://i.imgur.com/ekDqYxM.png'
                                alt='greeting'
                            />
                        </div>
                        <div >
                            <h1 className='text-2xl mt-4 font-semibold mb-16 text-[#313131ba] dark:text-white'>การทักทายภาษาสเปน</h1>
                            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1]'>Premium</h1>
                        </div>
                    </motion.div>
                </div>
                <div className='flex gap-8 justify-center '>
                    <motion.div
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.3 }}
                        onClick={() => hdlLessonClick('letters')}
                        className=' hover:cursor-pointer shadow-md bg-[#faebb4] hover:bg-[#faebb4b6] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg
                    dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]
                   '
                    >
                        <div className='w-[15rem] h-[15rem]  overflow-hidden mt-8 rounded-lg bg-slate-200'>
                            <img
                                className='w-full h-full object-cover'
                                src='https://i.imgur.com/7IHZDDF.png'
                                alt='greeting'
                            />
                        </div>
                        <div>
                            <h1 className='text-2xl mt-4 font-semibold mb-16 text-[#313131ba] dark:text-white'>ตัวอักษร</h1>
                            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1]'>Premium</h1>
                        </div>
                    </motion.div>
                </div>
                <div className='flex gap-8 justify-center '>
                    <motion.div
                        whileHover={{ scale: [null, 1.2, 1.1] }}
                        transition={{ duration: 0.3 }}
                        onClick={() => hdlLessonClick('presente')}
                        className=' hover:cursor-pointer shadow-md bg-[#faebb4] hover:bg-[#faebb4b6] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg
                    dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]
                   '
                    >
                        <div className='w-[15rem] h-[15rem]  overflow-hidden mt-8 rounded-lg bg-slate-200'>
                            <img
                                className='w-full h-full object-cover'
                                src='https://i.imgur.com/DpMOQsL.png'
                                alt='greeting'
                            />
                        </div>
                        <div>
                            <h1 className='text-2xl mt-4 font-semibold mb-16 text-[#313131ba] dark:text-white'>การผันเวิร์บปัจจุบัน</h1>
                            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1]'>Premium</h1>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className='mt-8'>
                <motion.button
                    whileHover={{ scale: [null, 1.1] }}
                    transition={{ duration: 0.3 }}
                    className='mt-14 text-xl border-2 border-[#22A094] p-1 hover:bg-[#E2FAF8] dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef] rounded-md !important'
                    onClick={hdlLearnMore}
                >
                    ดูบทเรียนเพิ่มเติม
                </motion.button>
                <SubscriptModal />
            </div>
        </div>
    )
}

export default Subscript
