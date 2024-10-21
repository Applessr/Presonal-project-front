import React, { useEffect } from 'react';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import useProgressStore from '../../store/progress-store';
import { motion } from "framer-motion";

const UserLesson = () => {
  const token = useAuthStore((state) => state.token);
  const getAllLesson = useUserStore((state) => state.getAllLesson);
  const lesson = useUserStore((state) => state.lesson);
  const getUserAllProgress = useProgressStore((state) => state.getUserAllProgress);
  const allProgress = useProgressStore((state) => state.allProgress);
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      getUserAllProgress(token)
      getAllLesson(token);
    }
  }, [token, getAllLesson]);

  const hdlLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  }

  return (
    <div className='text-[#22A094] flex flex-col items-center'>
      <span>บทเรียนภาษาสเปน</span>
      <div className='pt-20 grid grid-cols-3 gap-y-16 gap-x-8 px-24 pb-10'>
        {lesson.map((item) => {
          const lessonProgress = allProgress.find((lesson) => lesson.lessonId === item.id);
          const score = lessonProgress ? lessonProgress.score : 0;
          return (
            <motion.div
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.3 }}
              onClick={() => hdlLessonClick(item.id)} key={item.id} className=' dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1] bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg shadow-md'>
              <div className='w-[15rem] h-[15rem] overflow-hidden mt-8 rounded-lg bg-slate-200'>
                <img
                  className='w-full h-full object-cover'
                  src={item.image}
                  alt={item.lessonName}
                />
              </div>
              <h1 className='text-2xl mt-4 font-semibold'>{item.lessonName}</h1>
              <h1 className='text-[#6e6e6ec7] dark:text-[#c9c3c3c7] mt-4'>{score} score</h1>
              <div className='mt-2'>
                {score === 0 ?
                  (
                    <img className='w-20' src="https://i.imgur.com/ciZE6Tg.png" alt="" />
                  ) : (
                    <img className='w-20' src="https://i.imgur.com/vuWnJig.png" alt="" />
                  )}
              </div>
            </motion.div>
          )
        })}
      </div>
      <Footer />
    </div>
  );
};

export default UserLesson;
