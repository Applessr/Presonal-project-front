import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const LessonById = () => {
  const navigate = useNavigate()

  const hdlBack = (e) => {
    e.preventDefault();
    document.getElementById('back_modal').showModal();
  }
  const hdlConfirmBack = () => {
    document.getElementById('back_modal').close();
    navigate('/user/lesson')
  }
  return (
    <div>
      <header className='m-10 flex justify-around'>
        <div
        onClick={hdlBack}
         className='btn btn-ghost rounded-full w-14 h-14'>
          <FaArrowLeftLong className='h-6 w-6' />
        </div>
        <span className='text-2xl'>การทักทาย</span>
        <div className='flex gap-4 items-center'>
          <span className='text-[#6E6E6E] text-lg'>1/12</span>
          <div className='btn btn-ghost rounded-full w-14 h-14'>
            < IoSettingsOutline className='h-6 w-6 ' />
          </div>
        </div>
      </header>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-3xl'>Hola แปลว่า</span>
        <img className='w-[350px] h-[350px]' src='https://www.svgrepo.com/show/423920/hello-hi-greeting.svg' />
      </div>
      <div className='flex justify-center gap-5'>
        <button className='p-2 border-2 border-[#6E6E6E] text-[#6E6E6E] text-xl rounded-lg'>สวัสดี</button>
        <button className='p-2 border-2 border-[#6E6E6E] text-[#6E6E6E] text-xl rounded-lg'>ลาก่อน</button>
      </div>
      <dialog id="back_modal" className="modal">
          <div className="modal-box flex flex-col">
            <h3 className="text-[#6E6E6E] text-xl text-center">ยืนยันหรือไม่ว่าต้องการออกจากการทำแบบทดสอบ</h3>
            <h3 className="text-[#6E6E6E] mt-4 text-center">คะแนนของคุณจะไม่ถูกบันทึก</h3>
            <div className="modal-action flex justify-center">
              <button
                className={`border-2 text-[#22A094] border-[#22A094] p-2 rounded-lg w-[40%] hover:bg-[#E2FAF8] `}
                onClick={hdlConfirmBack}
              >
                ยืนยัน
              </button>
              <button
                className="border-2 text-[#DB5252] border-[#DB5252] p-2 rounded-lg hover:bg-[#F6DBDB]"
                onClick={e => e.target.closest('dialog').close()}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </dialog>
    </div>
  )
}

export default LessonById
