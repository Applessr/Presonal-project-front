import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';
import { toast } from 'react-toastify';

const UserEditProfile = () => {
  const upDateUserProfile = useUserStore((state) => state.upDateUserProfile);
  const getUserInformation = useUserStore((state) => state.getUserInformation);
  const userProfile = useUserStore((state) => state.userProfile);
  const token = useAuthStore((state) => state.token);

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


  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validateProfileForm = () => {
    const { username } = form;
    if (!username) {
      toast.info('Please fill username for profile update');
      return false;
    }
    return true;
  };

  const validateEmailForm = () => {
    const { email } = form;
    if (!email) {
      toast.info('Please fill email for profile update');
      return false;
    }
    return true;
  };

  const validatePasswordForm = () => {
    const { currentPassword, newPassword, confirmPassword } = form;
    if (!(currentPassword && newPassword && confirmPassword)) {
      toast.info('Please fill all password fields');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.info('New password and confirm password should match');
      return false;
    }
    return true;
  };

  const hdlSubmitProfile = async (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;
    try {
      await upDateUserProfile(token, { username: form.username });
      toast.success('Username updated to ' + form.username);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error(errMsg);
    }
  };
 
  const hdlSubmitEmail = async (e) => {
    e.preventDefault();
    if (!validateEmailForm()) return;
    try {
      await upDateUserProfile(token, { email: form.email });
      toast.success('Email updated to ' + form.email);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      toast.error(errMsg);
    }
  };

  const hdlSubmitPassword = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;
    try {
      await upDateUserProfile(token, {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success('Password updated successfully');
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message;
      console.log(errMsg);
      ToastContainer.error(errMsg);
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center p-28 w-[50%] mx-auto'>
        <h1 className='text-2xl text-[#22A094]'>ตั้งค่า</h1>
        
        {/* อัปเดตชื่อผู้ใช้ */}
        <form className='flex flex-col w-[75%] mb-14' onSubmit={hdlSubmitProfile}>
          <span className='mb-2 font-semibold text-xl'>ชื่อผู้ใช้</span>
          <input
            onChange={hdlOnChange}
            value={form.username}
            name='username'
            type="text"
            className='border-2 rounded-lg p-2 mb-4'
          />
          <button className='border-2 w-[25%] border-[#22A094] p-2 rounded-xl text-[#22A094] hover:bg-[#E2FAF8]'>ยืนยัน</button>
        </form>

        {/* อัปเดตอีเมล */}
        <form className='flex flex-col w-[75%] mb-14' onSubmit={hdlSubmitEmail}>
          <span className='mb-2 font-semibold text-xl'>อีเมล</span>
          <input
            onChange={hdlOnChange}
            value={form.email}
            name='email'
            type="text"
            className='border-2 rounded-lg p-2 mb-4'
          />
          <button className='border-2 w-[25%] border-[#22A094] p-2 rounded-xl text-[#22A094] hover:bg-[#E2FAF8]'>ยืนยัน</button>
        </form>

        {/* เปลี่ยนรหัสผ่าน */}
        <div className='flex flex-col w-[75%]'>
          <span className='font-semibold text-xl'>เปลี่ยนรหัสผ่าน</span>
          <span className='text-[#22A094] mt-4'><Link to='/forget-password'>ลืมรหัสผ่านใช่หรือไม่</Link></span>
          <form className='flex flex-col mt-8' onSubmit={hdlSubmitPassword}>
            <span className='mb-2 text-lg text-[#6E6E6E]'>รหัสผ่านปัจจุบัน</span>
            <input
              onChange={hdlOnChange}
              value={form.currentPassword}
              name='currentPassword'
              type="password"
              className='border-2 rounded-lg p-2 mb-4'
            />
            <span className='mb-2 text-lg text-[#6E6E6E]'>รหัสผ่านใหม่</span>
            <input
              onChange={hdlOnChange}
              value={form.newPassword}
              name='newPassword'
              type="password"
              className='border-2 rounded-lg p-2 mb-4'
            />
            <span className='mb-2 text-lg text-[#6E6E6E]'>ยืนยันรหัสผ่าน</span>
            <input
              onChange={hdlOnChange}
              value={form.confirmPassword}
              name='confirmPassword'
              type="password"
              className='border-2 rounded-lg p-2 mb-4'
            />
            <button className='mt-8 border-2 w-[25%] border-[#22A094] p-2 rounded-xl text-[#22A094] hover:bg-[#E2FAF8]'>ยืนยัน</button>
          </form>
        </div>

        {/* ลบบัญชี */}
        <div className='flex flex-col w-[75%] mt-10'>
          <span className='font-semibold text-xl'>ลบบัญชี</span>
          <span className='mb-2 text-sm text-[#6E6E6E] mt-3'>การดำเนินการนี้จะลบข้อมูลทั้งหมดของคุณและไม่สามารถยกเลิกได้</span>
          <button className='mt-8 border-2 w-[25%] border-[#DB5252] p-2 rounded-xl bg-[#F6DBDB] text-[#DB5252] hover:bg-[#f6dbdbc2]'>ลบบัญชี</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserEditProfile;