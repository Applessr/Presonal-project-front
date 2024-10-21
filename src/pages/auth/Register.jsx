import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import useAuthStore from '../../store/auth-store';
import validateRegister from '../../utils/validator';

const initialState = {
  username: "",
  email: "",
  password: ""
};

const Register = () => {
  const isDark = useAuthStore((state) => state.isDark);
  const actionRegister = useAuthStore((state) => state.actionRegister);
  const errorRegister = useAuthStore((state) => state.errorRegister);
  const clearError = useAuthStore((state) => state.clearError);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    clearError()
  },[])

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(form);
    if (validationErrors) {
      return setFormErrors(validationErrors);
    }
    try {
      await actionRegister(form);
      if (!errorRegister && !formErrors) {
        navigate('/')
      }
    } catch (error) {
      if (error.message.includes === 'exist') {
        setFormErrors({ username: 'User name is already in use' });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='text-[#22A094] bg-[#E2FAF8] dark:bg-[#6E6E6E] w-full h-screen pt-40'>
      <div className='p-2 w-[30%] m-auto text-[#6e6e6ec8] bg-white dark:bg-[#2c2c2a]  dark:text-[#e7f4ef] rounded-lg shadow-lg '>
        <div className="mx-auto w-36 mt-12"> {isDark
          ? <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
          : <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />}
        </div>
        <form
          onSubmit={hdlSubmit}
          className="flex flex-col mx-20">
          <span className=" mt-6">ชื่อผู้ใช้</span>
          <input
            className="border border-[#6e6e6ec1] p-2 rounded-md  text-black dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49]"
            name='username'
            onChange={hdlOnChange}
            value={form.username}
          />
          {formErrors.username && (
            <span className='text-red-500 text-xs dark:text-[#DB5252]'>{formErrors.username}</span>
          )}
          {errorRegister && !formErrors.username && errorRegister.includes('ser') && (
            <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">
              {errorRegister}
            </div>
          )}
          <span className="mt-6">อีเมล</span>
          <input
            className="border border-[#6e6e6ec1] p-2 rounded-md text-black dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49]"
            name='email'
            onChange={hdlOnChange}
            value={form.email}
          />
          {formErrors.email && (
            <span className='text-red-500 text-xs dark:text-[#DB5252]'>{formErrors.email}</span>
          )}
              {errorRegister && !formErrors.email && errorRegister.includes('mail') && (
            <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">
              {errorRegister}
            </div>
          )}
          <span className="mt-6">รหัสผ่าน</span>
          <input
            className="border  text-black dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] border-[#6e6e6ec1] p-2 rounded-md"
            type="password"
            name='password'
            onChange={hdlOnChange}
            value={form.password}
          />
          {formErrors.password && (
            <span className='text-red-500 text-xs dark:text-[#DB5252]'>{formErrors.password}</span>
          )}
                 {errorRegister && !formErrors.password && errorRegister.includes('assword') && (
            <div className="text-red-500 text-sm text-left dark:text-[#DB5252]">
              {errorRegister}
            </div>
          )}
          <button className="border-2 border-[#22A094] text-[#22A094] rounded-md p-2 mt-8 mb-8 dark:border-[#e7f4ef] dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef]">ลงทะเบียน</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
