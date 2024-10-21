import React from 'react'
import useAuthStore from '../../store/auth-store'
import { useNavigate } from 'react-router-dom'

const SubscriptModal = () => {
    const isDark = useAuthStore((state) => state.isDark)
    const navigate = useNavigate()
    return (
        <div>
            <dialog id="subscript_modal" className="modal">
                <div className="modal-box dark:bg-[#2c2c2a] ">
                    <button
                        type="button"
                        onClick={(e) => e.target.closest('dialog').close()}
                        className="btn btn-sm btn-circle btn-ghost absolute text-xl right-2 top-2">✕
                    </button>
                    <div className="mx-auto w-36 mt-12">
                        {isDark
                            ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
                            : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
                    </div>
                    <div className='mt-8'>
                        <h1 className='text-2xl text-center text-[#6e6e6ec8] dark:text-[#e7f4ef]'>ยกระดับประสบการณ์การเรียนรู้ของคุณ!</h1>
                        <h2 className='text-lg mt-3 mb-6 text-[#6e6e6ec8] dark:text-[#e7f4ef]'> เข้าถึงบทเรียนพิเศษ เรียนรู้เพิ่มเติมด้วยคอร์สที่ออกแบบมาเฉพาะสำหรับสมาชิก Premium เท่านั้น!</h2>
                        <button onClick={() => navigate('/user/upgrade/selectplan')} className='btn border-2 hover:bg-[#E2FAF8] dark:hover:bg-[#e7f4ef49] mt-4 text-xl'>สมัครเป็นสมาชิก</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default SubscriptModal
