import React, { useEffect, useState } from 'react'
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
import useUserStore from '../store/user-store';
import useAuthStore from '../store/auth-store';

const WordDay = () => {

  const wordOfTheDay = useUserStore((state) => state.wordOfTheDay);
  const getRandomWord = useUserStore((state) => state.getRandomWord);

  useEffect(() => {

    getRandomWord()
}, [getRandomWord]);
  



  return (
    <div className='flex justify-center mt-20'>
      <div className='bg-[#E2FAF8] w-[45%] p-4 flex flex-col items-center rounded-xl'>
        <h1 className='text-xl font-light text-[#6e6e6ec7] mb-4'>คำน่ารู้</h1>
        <div className='w-24 h-24 rounded-md overflow-hidden bg-slate-300'>
          <img
            className='w-full h-full object-cover'
            src={wordOfTheDay ? wordOfTheDay.image : 'https://i.imgur.com/09ssq0l.jpeg'}
            alt='คำน่ารู้'
          />
        </div>
        <h1 className='text-2xl font-bold mt-4 text-[#22A094]'>{wordOfTheDay ? wordOfTheDay.wordEs : '...'}</h1>
        <h1 className='text-xl font-light text-[#6e6e6ec7] mb-4'>{wordOfTheDay ? wordOfTheDay.wordTh : '...'}</h1>
        <h1 className='flex text-xl font-light text-[#6e6e6ec7] mb-4'>
          <span className='w-6 h-6 flex items-center justify-center'>
            <HiOutlineStar className='w-7 h-7 text-[#6E6E6E]' />
          </span>
          บันทึกไปยังรายการโปรด
        </h1>
      </div>
    </div>
  )
}

export default WordDay
