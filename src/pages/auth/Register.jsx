import React, { useState } from 'react';
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
  const actionRegister = useAuthStore((state) => state.actionRegister);
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

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
      setFormErrors(validationErrors);
      return;
    }

    try {
      await actionRegister(form);
      navigate('/'); 
    } catch (error) {
      if (error.message === 'ชื่อผู้ใช้นี้มีอยู่แล้ว') {
        setFormErrors({ username: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='text-[#22A094] bg-[#E2FAF8] w-full h-screen pt-40'>
      <div className='border w-[40%] m-auto bg-white rounded-lg shadow-lg '>
        <img className='w-36 ml-56 mt-10' src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
        <form
          onSubmit={hdlSubmit}
          className="flex flex-col mx-20">
          <span className="text-[#6e6e6ec8] mt-6">ชื่อผู้ใช้</span>
          <input
            className="border border-[#6e6e6ec1] p-2 rounded-md"
            name='username'
            onChange={hdlOnChange}
            value={form.username}
          />
          {formErrors.username && (
            <span className='text-red-500 text-xs'>{formErrors.username}</span>
          )}
          <span className="text-[#6e6e6ec8] mt-6">อีเมล</span>
          <input
            className="border border-[#6e6e6ec1] p-2 rounded-md"
            name='email'
            onChange={hdlOnChange}
            value={form.email}
          />
          {formErrors.email && (
            <span className='text-red-500 text-xs'>{formErrors.email}</span>
          )}
          <span className="text-[#6e6e6ec8] mt-6">รหัสผ่าน</span>
          <input
            className="border border-[#6e6e6ec1] p-2 rounded-md"
            type="password"
            name='password'
            onChange={hdlOnChange}
            value={form.password}
          />
          {formErrors.password && (
            <span className='text-red-500 text-xs'>{formErrors.password}</span>
          )}
          <button className="border-2 border-[#22A094] rounded-md p-2 mt-8 mb-8">ลงทะเบียน</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
