import React, { useState } from 'react';
import { forget } from '../../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';

const ForgetPassword = () => {
    const isDark = useAuthStore((state) => state.isDark);
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
            const body = { email: email }
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
        <div className='text-[#22A094] bg-[#E2FAF8] dark:bg-[#6E6E6E] w-full h-screen pt-40'>
            <div className='text-[#6e6e6ec8] w-[30%] m-auto flex flex-col bg-white rounded-lg shadow-lg dark:bg-[#2c2c2a]  dark:text-[#e7f4ef] '>
                <div className="mx-auto w-36 mt-12"> {isDark
                    ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
                    : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
                </div>
                <form className="flex flex-col mx-20">
                    <span className=" mt-6 text-center">
                        ป้อนที่อยู่อีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน</span>
                    <span className=" mt-6">อีเมล</span>
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
                        className="border-2 text-[#22A094] border-[#22A094] rounded-md p-2 mt-8 mb-8 dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef]">
                        ส่งอีเมล
                    </button>
                </form>
                <span className="text-center ml-4 cursor-pointer mb-4" >
                    ยังไม่มีบัญชี? <span className="text-[#22A094] dark:text-[#45bcb0]" onClick={hdlIsRegister}> ลงทะเบียน </span>
                </span>
                <dialog id="confirm_forget" className="modal">
                    <div className="modal-box flex flex-col dark:bg-[#2c2c2a] text-[#6e6e6ec8] dark:text-[#e7f4ef]">
                        <h3 className="font-semibold text-center text-xl">ยืนยันหรือไม่ว่าจะส่งอีเมล</h3>
                        <p className="py-4 text-[#6e6e6ec8] text-center dark:text-[#9f9f9f]">ลิงค์รีเซ็ตรหัสผ่านจะหมดอายุภายใน 1 ชั่วโมง กรุณาดำเนินการเปลี่ยนรหัสผ่านให้เสร็จสิ้นภายใน 1 ชั่วโมง</p>
                        <div className="modal-action flex justify-center">
                            <button
                                className={`border-2 border-[#22A094] dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] p-2 rounded-lg w-[40%] hover:bg-[#E2FAF8] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={confirmSubmit}
                                disabled={loading}
                            >
                                {loading ? <span className="loading loading-dots loading-sm"></span> : 'ยืนยัน'}
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
