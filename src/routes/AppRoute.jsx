import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LandingPage from '../pages/LandingPage';
import Translator from '../pages/Translator';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Unauthorized from '../pages/Unauthorized';
import GuestLayout from '../layout/GuestLayout';
import PageNotFound from '../pages/PageNotFound';
import AdminLayout from '../layout/AdminLayout';
import UserLayout from '../layout/UserLayout';
import Dashboard from '../pages/admin/Dashboard';
import ManageUser from '../pages/admin/ManageUser';
import ManageVocap from '../pages/admin/ManageVocap';
import UserFavorite from '../pages/user/UserFavorite';
import MainVocab from '../pages/user/MainVocab';
import ProtectRoute from './ProtectRoute';
import UserLesson from '../pages/user/Userlesson';
import UserEditProfile from '../pages/user/UserEditProfile';
import LessonById from '../pages/lesson/LessonById';
import ForgetPassword from '../pages/auth/ForgetPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import LessonLayout from '../layout/LessonLayout';
import Vocabulary from '../pages/user/Vocabulary';
import FirstPage from '../pages/lesson/FirstPage';


const guestRouter = createBrowserRouter([
    { 
        path : '/',
        element: <GuestLayout/>,
        children: [
            { index: true, element: <LandingPage/>},
            { path: '/translate', element: <Translator/>},
            { path: 'register', element: <Register/>},
            { path: 'login', element: <Login/>},
            { path: 'forget-password', element: <ForgetPassword/>},
            { path: 'reset-password', element: <ResetPassword/>},
            { path: 'unauthorization', element: <Unauthorized/>},
            { path: '*', element: <PageNotFound/>},
        ],
    },
    {
        path : '/admin',
        element: <ProtectRoute element={<AdminLayout/>} allow={["ADMIN"]}/>,
        children: [
            { index: true, element: <Dashboard/>},
            { path: 'manages', element: <ManageUser/>},
            { path: 'vocabulary', element: <ManageVocap/>},
        ],
    },
    {
        path : '/user',
        element: <ProtectRoute element={< UserLayout/>} allow={["USER","ADMIN"]}/>,
        children: [
            { index: true, element: <LandingPage/>},
            { path: 'translate', element: <Translator/>},
            { path: 'user-favorite', element: <UserFavorite/>},
            { path: 'user-edit-profile', element: <UserEditProfile/>},
            { path: 'category', element: <MainVocab/>},
            { path: 'category/:categoryId', element: <Vocabulary/>},
            { path: 'lesson', element: <UserLesson/>},
        ],
    },
    {
        path : 'lesson/:lessonId',
        element: <ProtectRoute element={< LessonLayout/>} allow={["USER","ADMIN"]}/>,
        children: [
            { index: true, element: <FirstPage/>},
            { path: ':questionId', element: <LessonById/>},
        ],
    },
]);


export default function AppRouter() {
    return (
      <div>
        <RouterProvider router={guestRouter}/>
      </div>
    )
  }
  