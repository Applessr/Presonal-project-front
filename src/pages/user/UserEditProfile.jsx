import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';
import { toast } from 'react-toastify';

const UserEditProfile = () => {
  const navigate = useNavigate();
  const actionLogout = useAuthStore((state) => state.actionLogout);
  const upDateUserProfile = useUserStore((state) => state.upDateUserProfile);
  const getUserInformation = useUserStore((state) => state.getUserInformation);
  const deleteUserProfile = useUserStore((state) => state.deleteUserProfile);
  const userProfile = useUserStore((state) => state.userProfile);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: userProfile.username,
    email: userProfile.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (token) {
      getUserInformation(token);
    }
  }, [token, getUserInformation]);

  useEffect(() => {
    if (userProfile) {
      setForm({
        username: userProfile.username,
        email: userProfile.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [userProfile]);

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateProfileForm = () => {
    const { username } = form;
    if (!username) {
      toast.info('กรุณากรอกชื่อผู้ใช้สำหรับการอัปเดตโปรไฟล์');
      return false;
    }
    return true;
  };

  const validateEmailForm = () => {
    const { email } = form;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      toast.info('กรุณากรอกอีเมลสำหรับการอัปเดต');
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.info('กรุณากรอกอีเมลให้ถูกต้อง');
      return false;
    }
    return true;
  };

  const validatePasswordForm = () => {
    const { currentPassword, newPassword, confirmPassword } = form;
    if (!(currentPassword && newPassword && confirmPassword)) {
      toast.info('กรุณากรอกข้อมูลรหัสผ่านทั้งหมด');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.info('รหัสผ่านใหม่และการยืนยันรหัสผ่านต้องตรงกัน');
      return false;
    }
    return true;
  };

  const hdlSubmitProfile = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;
    try {
      setLoading(true);
      await upDateUserProfile(token, { username: form.username });
      toast.success('ชื่อผู้ใช้ถูกอัปเดตเป็น ' + form.username);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const hdlSubmitEmail = async (e) => {
    e.preventDefault();
    if (!validateEmailForm()) return;
    try {
      setLoading(true);
      await upDateUserProfile(token, { email: form.email });
      toast.success('อีเมลถูกอัปเดตเป็น ' + form.email);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const hdlSubmitPassword = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
    try {
      setLoading(true);
      await upDateUserProfile(token, {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success('รหัสผ่านถูกอัปเดตเรียบร้อยแล้ว');
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  
  const hdlSubmit = async (e) => {
    e.preventDefault();
    document.getElementById('delete_profile').showModal();
  };

  const hdlConfirmDeleteProfile = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await deleteUserProfile(token);
      toast.success('โปรไฟล์ของคุณถูกลบเรียบร้อยแล้ว');
      document.getElementById('delete_profile').close();
      actionLogout()
      navigate('/');
    } catch(err) {
      const errorMessage = err.response?.data?.message || 'มีข้อผิดพลาดในการลบโปรไฟล์ของคุณ';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center p-28 w-[50%] mx-auto'>
        <h1 className='text-2xl text-[#22A094] dark:text-[#45bcb0]'>ตั้งค่า</h1>
        
        {/* อัปเดตชื่อผู้ใช้ */}
        <form className='flex flex-col w-[75%] mb-14' onSubmit={hdlSubmitProfile}>
          <span className='mb-2 font-semibold text-xl'>ชื่อผู้ใช้</span>
          <input
            onChange={hdlOnChange}
            value={form.username}
            name='username'
            type="text"
            className='border-2 rounded-lg p-2 mb-4 text-black'
          />
          <button className='border-2 w-[25%] border-[#22A094] p-2 rounded-xl text-[#22A094] hover:bg-[#E2FAF8] dark:border-[#e7f4ef]  dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef]' disabled={loading}>
            {loading ? <span className="loading loading-dots loading-md"></span> : 'ยืนยัน'}
          </button>
        </form>

        {/* อัปเดตอีเมล */}
        <form className='flex flex-col w-[75%] mb-14' onSubmit={hdlSubmitEmail}>
          <span className='mb-2 font-semibold text-xl'>อีเมล</span>
          <input
            onChange={hdlOnChange}
            value={form.email}
            name='email'
            type="text"
            className='border-2 rounded-lg p-2 mb-4 text-black'
          />
          <button className='border-2 w-[25%] border-[#22A094] p-2 rounded-xl text-[#22A094] hover:bg-[#E2FAF8] dark:border-[#e7f4ef]  dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef]' disabled={loading}>
            {loading ? <span className="loading loading-dots loading-md"></span> : 'ยืนยัน'}
          </button>
        </form>

        {/* เปลี่ยนรหัสผ่าน */}
        <div className='flex flex-col w-[75%]'>
          <span className='font-semibold text-xl'>เปลี่ยนรหัสผ่าน</span>
          <span className='text-[#22A094] mt-4 dark:text-[#45bcb0]'><Link to='/forget-password'>ลืมรหัสผ่านใช่หรือไม่</Link></span>
          <form className='flex flex-col mt-8' onSubmit={hdlSubmitPassword}>
            <span className='mb-2 text-lg text-[#6E6E6E]'>รหัสผ่านปัจจุบัน</span>
            <input
              onChange={hdlOnChange}
              value={form.currentPassword}
              name='currentPassword'
              type="password"
              className='border-2 rounded-lg p-2 mb-4 text-black'
            />
            <span className='mb-2 text-lg text-[#6E6E6E]'>รหัสผ่านใหม่</span>
            <input
              onChange={hdlOnChange}
              value={form.newPassword}
              name='newPassword'
              type="password"
              className='border-2 rounded-lg p-2 mb-4 text-black'
            />
            <span className='mb-2 text-lg text-[#6E6E6E]'>ยืนยันรหัสผ่าน</span>
            <input
              onChange={hdlOnChange}
              value={form.confirmPassword}
              name='confirmPassword'
              type="password"
              className='border-2 rounded-lg p-2 mb-4 text-black'
            />
            <button className='mt-8 border-2 w-[25%] border-[#22A094] p-2 rounded-xl text-[#22A094] hover:bg-[#E2FAF8] dark:border-[#e7f4ef]  dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef]' disabled={loading}>
              {loading ? <span className="loading loading-dots loading-md"></span> : 'ยืนยัน'}
            </button>
          </form>
        </div>

        {/* ลบบัญชี */}
        <div className='flex flex-col w-[75%] mt-10'>
          <span className='font-semibold text-xl'>ลบบัญชี</span>
          <span className='mb-2 text-sm text-[#6E6E6E] mt-3'>การดำเนินการนี้จะลบข้อมูลทั้งหมดของคุณและไม่สามารถยกเลิกได้</span>
          <button 
          onClick={hdlSubmit}
          className='mt-8 border-2 w-[25%] border-[#DB5252] p-2 rounded-xl bg-[#F6DBDB] text-[#DB5252] hover:bg-[#f6dbdbc2]'>ลบบัญชี</button>
        </div>
        <dialog id="delete_profile" className="modal">
          <div className="modal-box flex flex-col dark:bg-[#6E6E6E]">
            <h3 className="font-semibold text-center text-xl">ยืนยันหรือไม่ว่าจะทำการลบบัญชีผู้ใช้ของคุณ</h3>
            <h3 className="text-[#6E6E6E] dark:text-[#c5c4c4] text-center mt-5">การดำเนินการนี้จะลบข้อมูลทั้งหมดของคุณและไม่สามารถยกเลิกได้</h3>
            <div className="modal-action flex justify-center">
              <button
                className={`border-2 text-[#22A094] border-[#22A094] p-2 rounded-lg w-[40%] hover:bg-[#E2FAF8] dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={hdlConfirmDeleteProfile}
                disabled={loading}
              >
                {loading ? <span className="loading loading-dots loading-md"></span> : 'ยืนยัน'}
              </button>
              <button
                className="border-2 text-[#e65f5f] border-[#e65f5f] bg-[#F6DBDB] hover:bg-[#f6dbdbc2] p-2 rounded-lg hover:bg-[#F6DBDB]"
                onClick={e => e.target.closest('dialog').close()}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <Footer />
    </div>
  );
}

export default UserEditProfile;