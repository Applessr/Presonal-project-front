import React from 'react'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'

const PayMentSuccess = () => {
    const navigate = useNavigate()
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <div className='flex flex-col items-center justify-center mt-36'>
                <img className='w-[200px]' src="https://i.imgur.com/V8enDys.png" alt="" />
                <h1 className='text-3xl my-4'>Payment success</h1>
                <h1 className='text-2xl'>ขอบคุณที่สมัครสมาชิก Premium!</h1>
                <h1 className='text-md mt-6'>เราขอขอบคุณเป็นอย่างยิ่งที่คุณเลือกสมัครเป็นสมาชิก Premium เพื่อรับสิทธิพิเศษต่าง ๆ จากเรา </h1>
                <h1 className='text-md'>การสนับสนุนของคุณทำให้เรามุ่งมั่นที่จะพัฒนาบริการให้ดียิ่งขึ้น เพื่อมอบประสบการณ์ที่ดีที่สุดให้กับคุณ</h1>
                <button 
                onClick={()=> navigate('/subscript')}
                className='btn border-2 hover:bg-[#E2FAF8] dark:hover:bg-[#e7f4ef49] mt-4 text-xl'>กลับสู่หน้าหลัก</button>
            </div>
            <Footer />
        </div>
    )
}

export default PayMentSuccess;
