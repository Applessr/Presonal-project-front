import React from 'react';
import UserSum from '../../components/admin/UserSum';
import VocabularySum from '../../components/admin/VocabularySum';
import LessonSum from '../../components/admin/LessonSum';
import Allsearch from '../../components/admin/Allsearch';
import UserChar from '@/src/components/admin/UserChar';
import NewSubscript from '@/src/components/admin/NewSubscript';
import Newuser from '@/src/components/admin/Newuser';

const Dashboard = () => {
  return (
    <div className='bg-[#E2FAF8] h-screen w-screen flex flex-col'>
      <div
        className='h-full w-full'
        style={{ backgroundImage: "url('https://i.imgur.com/lY6Fwlc.png')" }}>
        <div className='flex justify-evenly pt-12'>
          <div className=''>
            <div className='m-12 flex gap-10'>
              <UserSum />
              <UserChar/>
              <div className='flex flex-col gap-4'>
              <Newuser/>
              <NewSubscript/>
              </div>
            </div>
            <div className='flex '>
              <VocabularySum />
              <LessonSum />
              <Allsearch/>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
