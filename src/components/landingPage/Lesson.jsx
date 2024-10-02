import React from 'react'

const Lesson = () => {
  return (
    <div className='flex flex-col'>
    <div className='flex gap-8 justify-center'>
        <div className='bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg'>
            <div className='w-[15rem] h-[15rem] overflow-hidden mt-8 rounded-lg bg-slate-200'>
            <img
                className='w-full h-full object-cover'
                src='https://i.imgur.com/tZO7rvD.png'
                alt='การทักทาย'
            />
            </div>
            <h1 className='text-2xl mt-4 font-semibold'>การทักทาย</h1>
            <h1 className='text-[#6e6e6ec7] mt-4'>1/12</h1>
            <div className='w-[80%] mt-8 bg-white rounded-full h-3 mb-4 '>
                <div
                className='bg-[#22A094] h-3 rounded-full'
                style={{ width: '10%' }} >
                </div>
            </div>
        </div>

        <div className='bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg'>
            <div className='w-[15rem] h-[15rem] overflow-hidden mt-8 rounded-lg bg-slate-200'>
            <img
                className='w-full h-full object-cover'
                src='https://i.imgur.com/3XpDz2r.png'
                alt='การเดินทาง'
            />
            </div>
            <h1 className='text-2xl mt-4 font-semibold'>การเดินทาง</h1>
            <h1 className='text-[#6e6e6ec7] mt-4'>0/12</h1>
            <div className='w-[80%] mt-8 bg-white rounded-full h-3 mb-4'>
                <div
                className='bg-[#22A094] h-3 rounded-full'
                style={{ width: '0%' }} >
                </div>
            </div>
        </div>

        <div className='bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg'>
            <div className='w-[15rem] h-[15rem] overflow-hidden mt-8 rounded-lg bg-slate-200'>
            <img
                className='w-full h-full object-cover'
                src='https://i.imgur.com/6L2VrWa.png'
                alt='การสั่งอาหาร'
            />
            </div>
            <h1 className='text-2xl mt-4 font-semibold'>การสั่งอาหาร</h1>
            <h1 className='text-[#6e6e6ec7] mt-4'>0/12</h1>
            <div className='w-[80%] mt-8 bg-white rounded-full h-3 mb-4 '>
                <div
                className='bg-[#22A094] h-3 rounded-full'
                style={{ width: '0%' }} >
                </div>
            </div>
        </div>
     </div>
    <div className='mt-8'>
    <button className='text-xl border-2 border-[#22A094] p-1 rounded-md hover:bg-[#E2FAF8]'>ดูบทเรียนเพิ่มเติม</button>
    </div>
</div>
  )
}

export default Lesson
