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
import UserProfile from '../pages/user/UserProfile';
import MainVocab from '../pages/user/MainVocab';
import Lesson from '../components/landingPage/Lesson';


const guestRouter = createBrowserRouter([
    { 
        path : '/',
        element: <GuestLayout/>,
        children: [
            { index: true, element: <LandingPage/>},
            { path: '/translate', element: <Translator/>},
            { path: 'register', element: <Register/>},
            { path: 'login', element: <Login/>},
            { path: 'unauthorization', element: <Unauthorized/>},
            { path: '*', element: <PageNotFound/>},
        ],
    },
    {
        path : '/admin',
        element: < AdminLayout/>,
        children: [
            { index: true, element: <Dashboard/>},
            { path: 'manages', element: <ManageUser/>},
            { path: 'vocabulary', element: <ManageVocap/>},
        ],
    },
    {
        path : '/user',
        element: < UserLayout/>,
        children: [
            { index: true, element: <LandingPage/>},
            { path: 'user-favorite', element: <UserFavorite/>},
            { path: 'user-profile', element: <UserProfile/>},
            { path: 'vocabulary', element: <MainVocab/>},
            { path: 'lesson', element: <Lesson/>},
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
  