
import React from 'react'
import { Outlet } from 'react-router-dom'
import LessonHeader from '../components/lesson/LessonHeader'

const LessonLayout = () => {
    return (
        <div>
            <LessonHeader/>
            <Outlet />
        </div>
    )
}

export default LessonLayout
