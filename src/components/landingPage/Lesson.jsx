import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/auth-store'
import useProgressStore from '../../store/progress-store';
import useUserStore from '../../store/user-store';
import { motion } from "framer-motion";

const Lesson = () => {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const getUserAllProgress = useProgressStore((state) => state.getUserAllProgress);
    const allProgress = useProgressStore((state) => state.allProgress);
    const getAllLesson = useUserStore((state) => state.getAllLesson);
    const lesson = useUserStore((state) => state.lesson);
    const subscriptionStatus = useAuthStore((state) => state.subscriptionStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {

            getAllLesson(token)
            getUserAllProgress(token);
        }
    }, [token, getUserAllProgress]);

    const lesson3 = lesson.slice(0, 3);


    const hdlLearnMore = () => {
        if (!user) {
            document.getElementById('login_modal').showModal();
        } else if (subscriptionStatus === 'ACTIVE') {
            navigate(`/subscript/lesson`);
        } else {
            navigate('/user/lesson');
        }
    }
    const hdlLessonClick = (lessonId) => {
        if (!user) {
            document.getElementById('login_modal').showModal();
        } else {
            navigate(`/lesson/${lessonId}`);
        }
    }


    return (
        <div className='flex flex-col mb-14 '>
            <div className='flex gap-8 justify-center '>
                {lesson3.map(item => {
                    const lessonProgress = allProgress.find((lesson) => lesson.lessonId === item.id);
                    const score = lessonProgress ? lessonProgress.score : 0;
                    return (

                        <motion.div
                            whileHover={{ scale: [null, 1.2, 1.1] }}
                            transition={{ duration: 0.3 }}
                            onClick={() => hdlLessonClick(item.id)} key={item.id}
                            className='box hover:cursor-pointer shadow-md bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[18rem] h-[27rem] flex flex-col items-center rounded-lg
                            dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]
                           '
                        >
                            <div className='w-[15rem] h-[15rem]  overflow-hidden mt-8 rounded-lg bg-slate-200'>
                                <img
                                    className='w-full h-full object-cover'
                                    src={item.image}
                                    alt={item.lessonName}
                                />
                            </div>
                            <h1 className='text-2xl mt-4 font-semibold'>{item.lessonName}</h1>
                            <h1 className='text-[#6e6e6ec7] dark:text-[#c4c4c4c7] mt-4'>{score} score</h1>
                        </motion.div>
                    );
                })}
            </div>
            <div className='mt-8'>
                <motion.button
                    whileHover={{ scale: [null, 1.1] }}
                    transition={{ duration: 0.3 }}
                    className='text-xl border-2 border-[#22A094] p-1 rounded-md hover:bg-[#E2FAF8]  dark:border-[#e7f4ef]  dark:hover:bg-[#e7f4ef49] dark:text-[#e7f4ef]'
                    onClick={hdlLearnMore}
                >
                    ดูบทเรียนเพิ่มเติม
                </motion.button>
            </div>
        </div>
    );
}

export default Lesson;
