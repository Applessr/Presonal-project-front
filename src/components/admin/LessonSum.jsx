import React, { useEffect } from 'react'
import useUserStore from '../../store/user-store'
import useAuthStore from '../../store/auth-store'

const LessonSum = () => {

    const token = useAuthStore((state) => state.token)
    const lesson = useUserStore((state) => state.lesson)
    const getAllLesson = useUserStore((state) => state.getAllLesson)

    useEffect(()=>{

        getAllLesson(token)
    },[])
  return (
    <div className="ml-10 stats shadow h-32">
    <div className="stat place-items-center">
        <div className="stat-title">Lesson</div>
        <div className="stat-value">{lesson.length}</div>
        <div className="stat-desc text-white">21% more than last month</div>
    </div>


</div>
  )
}

export default LessonSum
