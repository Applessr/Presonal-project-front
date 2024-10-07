import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ResetPassword } from "../../api/auth";
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromURL = queryParams.get('token');
    if (tokenFromURL) {
      setToken(tokenFromURL);
    }
  }, [location]);

  const isValidPassword = (password) => {
    return password.length >= 6; 
  };

  const hdlSubmit = (e) => {
    e.preventDefault();
    if (!isValidPassword(newPassword)) {
      toast.error('password much be contained at lead 6 character');
      return;
    }
    
    document.getElementById('reset_password').showModal();
  };

  const confirmSubmit = async () => {
    setLoading(true);
    try {
      const result = await ResetPassword(token, newPassword);
      toast.success('reset password successfully');
      document.getElementById('reset_password').close();
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'There was an error resetting your password.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='text-[#22A094] bg-[#E2FAF8] w-full h-screen pt-40'>
      <div className='border w-[40%] m-auto flex flex-col bg-white rounded-lg shadow-lg'>
        <img className='w-36 mt-10 self-center' src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
        <form className="flex flex-col mx-20">
          <span className="text-[#6e6e6ec8] mt-6 text-center">
            รีเซ็ตรหัสผ่าน</span>
          <span className="text-[#6e6e6ec8] mt-6">รหัสผ่านใหม่</span>
          <input
            className="border border-[#6e6e6ec1] p-2 rounded-md"
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            onClick={hdlSubmit}
            type="submit"
            className="border-2 border-[#22A094] rounded-md p-2 mt-8 mb-8">
            รีเซ็ตพาสเวิร์ด
          </button>
        </form>
        <dialog id="reset_password" className="modal">
          <div className="modal-box flex flex-col">
            <h3 className="font-semibold text-xl">ยืนยันหรือไม่ว่าจะเปลี่ยนรหัสผ่านของคุณ</h3>
            <div className="modal-action flex justify-center">
              <button
                className={`border-2 border-[#22A094] p-2 rounded-lg w-[40%] hover:bg-[#E2FAF8] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={confirmSubmit}
                disabled={loading}
              >
                {loading ? <span className="loading loading-dots loading-md"></span> : 'ยืนยัน'}
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
};

export default ResetPasswordPage;
