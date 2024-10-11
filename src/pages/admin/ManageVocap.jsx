import React from 'react'
import VocabTable from '../../components/admin/VocabTable'

const ManageVocap = () => {
  return (
    <div className='bg-[#E2FAF8] dark:bg-[#6E6E6E] h-screen w-screen flex flex-col items-center '>
      <h1 className='text-2xl mt-24 mb-4' >Vocabulary list</h1>
      <VocabTable />
    </div>
  )
}

export default ManageVocap
 