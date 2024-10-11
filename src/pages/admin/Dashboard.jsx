import React from 'react';
import UserSum from '../../components/admin/UserSum';
import VocabularySum from '../../components/admin/VocabularySum';
import LessonSum from '../../components/admin/LessonSum';

const Dashboard = () => {
  return (
    <div className='bg-[#E2FAF8] h-screen w-screen flex flex-col'>
      <div
        className='h-full w-full'
        style={{ backgroundImage: "url('https://i.imgur.com/lY6Fwlc.png')" }}>
        <h1 className='text-2xl my-6 pt-16 text-center dark:text-[#2C2C2A]'>Dash board</h1>
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
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
