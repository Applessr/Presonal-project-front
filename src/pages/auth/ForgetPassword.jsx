import React, { useState } from 'react';
import { forget } from '../../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const hdlOnChange = (e) => {
        setEmail(e.target.value);
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        document.getElementById('confirm_forget').close(); 
        document.getElementById('confirm_forget').showModal();
    };

    const confirmSubmit = async () => {
        setLoading(true); 
        try {
            const body = {email : email}
            await forget(body);
            toast.success('We have already sent the reset password link to your email. Please check it.');
            document.getElementById('confirm_forget').close(); 
            navigate('/');
        } catch (err) {
            console.log('Error detail:', err.response?.data?.message || 'An error occurred');
            toast.error(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false); 
        }
    };
    const hdlIsRegister = () => {
        document.getElementById('login_modal').close(); 
        navigate('/register'); 
    };

    return (
        <div className='text-[#22A094] bg-[#E2FAF8] w-full h-screen pt-40'>
            <div className='border w-[40%] m-auto flex flex-col bg-white rounded-lg shadow-lg'>
                <img className='w-36 mt-10 self-center' src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
                <form className="flex flex-col mx-20">
                    <span className="text-[#6e6e6ec8] mt-6 text-center">
                    ป้อนที่อยู่อีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน</span>
                    <span className="text-[#6e6e6ec8] mt-6">อีเมล</span>
                    <input
                        className="border border-[#6e6e6ec1] p-2 rounded-md"
                        name='email'
                        type='email'
                        value={email}
                        onChange={hdlOnChange}
                        required
                    />
                    <button
                        type="button"
                        onClick={hdlSubmit}
                        className="border-2 border-[#22A094] rounded-md p-2 mt-8 mb-8">
                        ส่งอีเมล
                    </button>
                </form>
                <span className="text-center text-[#6e6e6ec8] ml-4 cursor-pointer mb-4" >
                ยังไม่มีบัญชี? <span className="text-[#22A094]" onClick={hdlIsRegister}> ลงทะเบียน </span>
              </span>
                <dialog id="confirm_forget" className="modal">
                    <div className="modal-box flex flex-col">
                        <h3 className="font-semibold text-center text-xl">ยืนยันหรือไม่ว่าจะส่งอีเมล</h3>
                        <p className="py-4 text-[#6e6e6ec8] text-center">ลิงค์รีเซ็ตรหัสผ่านจะหมดอายุภายใน 1 ชั่วโมง กรุณาดำเนินการเปลี่ยนรหัสผ่านให้เสร็จสิ้นภายใน 1 ชั่วโมง</p>
                        <div className="modal-action flex justify-center">
                            <button
                                className={`border-2 border-[#22A094] p-2 rounded-lg w-[40%] hover:bg-[#E2FAF8] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={confirmSubmit}
                                disabled={loading} 
                            >
                                {loading ? <span className="loading loading-dots loading-md">กำลังส่ง</span> : 'ยืนยัน'}
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
        </div>
    );
}

export default ForgetPassword;
