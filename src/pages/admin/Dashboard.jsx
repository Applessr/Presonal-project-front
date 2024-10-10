import React from 'react';
import UserSum from '../../components/admin/UserSum';
import VocabularySum from '../../components/admin/VocabularySum';
import LessonSum from '../../components/admin/LessonSum';

const Dashboard = () => {
  return (
    <div className='bg-[#E2FAF8] h-screen w-screen flex flex-col'>
      <h1 className='text-2xl my-6 pt-12 text-center'>Dash board</h1>
      <div className='flex justify-evenly'>
        <div className=''>
          <div className='m-12'>
            <UserSum />
          </div>
          <div className='flex '>
            <VocabularySum />
            <LessonSum />
          </div>
        </div>
        <div className="bg-slate-100 rounded-md artboard phone-3">414×736</div>
      </div>
    </div>
  );
}

export default Dashboard;
