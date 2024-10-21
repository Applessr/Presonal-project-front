import React from 'react'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const SubscriptLesson = () => {
  const navigate = useNavigate()

  const hdlLessonClick = (where) => {
    navigate(`/subscript/${where}`);
  }

  return (
    <div className='flex flex-col items-center min-h-screen pt-28'>
      <div className='grid grid-cols-3 gap-y-16 gap-x-8 px-24 pb-10'>
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
            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1] text-center'>Premium</h1>
          </div>
        </motion.div>
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
            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1]  text-center'>Premium</h1>
          </div>
        </motion.div>
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
            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1] text-center'>Premium</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: [null, 1.2, 1.1] }}
          transition={{ duration: 0.3 }}
          onClick={() => hdlLessonClick('basic')}
          className=' hover:cursor-pointer shadow-md bg-[#faebb4] hover:bg-[#faebb4b6] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg
                    dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]
                   '
        >
          <div className='w-[15rem] h-[15rem]  overflow-hidden mt-8 rounded-lg bg-slate-200'>
            <img
              className='w-full h-full object-cover'
              src='https://i.imgur.com/zzbnReU.png'
              alt='greeting'
            />
          </div>
          <div>
            <h1 className='text-2xl mt-4 font-semibold mb-16 text-[#313131ba] dark:text-white'>ประโยคทั่วไปที่ควรรู้</h1>
            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1] text-center'>Premium</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: [null, 1.2, 1.1] }}
          transition={{ duration: 0.3 }}
          onClick={() => hdlLessonClick('telling-time')}
          className=' hover:cursor-pointer shadow-md bg-[#faebb4] hover:bg-[#faebb4b6] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg
                    dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]
                   '
        >
          <div className='w-[15rem] h-[15rem]  overflow-hidden mt-8 rounded-lg bg-slate-200'>
            <img
              className='w-full h-full object-cover'
              src='https://i.imgur.com/OpEeICG.png'
              alt='greeting'
            />
          </div>
          <div>
            <h1 className='text-2xl mt-4 font-semibold mb-16 text-[#313131ba] dark:text-white'>การบอกเวลา</h1>
            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1] text-center'>Premium</h1>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: [null, 1.2, 1.1] }}
          transition={{ duration: 0.3 }}
          onClick={() => hdlLessonClick('verb')}
          className=' hover:cursor-pointer shadow-md bg-[#faebb4] hover:bg-[#faebb4b6] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg
                    dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]
                   '
        >
          <div className='w-[15rem] h-[15rem]  overflow-hidden mt-8 rounded-lg bg-slate-200'>
            <img
              className='w-full h-full object-cover'
              src='https://i.imgur.com/coneeXQ.png'
              alt='greeting'
            />
          </div>
          <div>
            <h1 className='text-2xl mt-4 font-semibold mb-16 text-[#313131ba] dark:text-white'>เวิร์บในภาษาสเปน</h1>
            <h1 className='text-sm mt-4 font-semibold text-[#a1a1a1a1] text-center'>Premium</h1>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

export default SubscriptLesson
