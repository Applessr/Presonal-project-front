import React, { useEffect } from 'react';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const UserLesson = () => {
  const token = useAuthStore((state) => state.token);
  const getAllLesson = useUserStore((state) => state.getAllLesson);
  const lesson = useUserStore((state) => state.lesson);
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      getAllLesson(token);
    }
  }, [token, getAllLesson]);

  const hdlLessonClick = (lessonId) => {
    navigate(`/user/lesson/${lessonId}`);
  }

  return (
    <div className='text-[#22A094] flex flex-col items-center'>
      <span>บทเรียนภาษาสเปน</span>
      <div className='pt-20 grid grid-cols-3 gap-y-16 gap-x-8 px-24 pb-10'>
        {lesson.map((item) => (
          <div onClick={() => hdlLessonClick(item.id)} key={item.id} className='bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg shadow-md'>
            <div className='w-[15rem] h-[15rem] overflow-hidden mt-8 rounded-lg bg-slate-200'>
              <img
                className='w-full h-full object-cover'
                src={item.image}
                alt={item.lessonName}
              />
            </div>
            <h1 className='text-2xl mt-4 font-semibold'>{item.lessonName}</h1>
            <h1 className='text-[#6e6e6ec7] mt-4'>0/12</h1>
            <div className='w-[80%] mt-8 bg-white rounded-full h-3 mb-4'>
              <div
                className='bg-[#22A094] h-3 rounded-full'
                style={{ width: '0%' }} >
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default UserLesson;
