import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';

const LessonHeader = () => {
    const { lessonId } = useParams();
    const token = useAuthStore((state) => state.token);
    const getLessonId = useUserStore((state) => state.getLessonId);
    const lessonName = useUserStore((state) => state.lessonName);
    const questions = useUserStore((state) => state.questions);
    const navigate = useNavigate();

    useEffect(() => {
        if (token && lessonId) {
          getLessonId(token, lessonId);
        }
      }, [token, lessonId, getLessonId]);
    

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
            <header className='m-10 pt-4 flex justify-around items-center'>
                <div
                    onClick={hdlBack}
                    className='btn btn-ghost rounded-full w-14 h-14'>
                    <FaArrowLeftLong className='h-6 w-6' />
                </div>
                <span className='text-2xl'>{lessonName}</span>
                <div className='flex gap-4 items-center'>
                    <span className='text-[#6E6E6E] text-lg'>{questions.length} ข้อ</span>
                    <div className='btn btn-ghost rounded-full w-14 h-14'>
                        < IoSettingsOutline className='h-6 w-6 ' />
                    </div>
                </div>
            </header>
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

export default LessonHeader
