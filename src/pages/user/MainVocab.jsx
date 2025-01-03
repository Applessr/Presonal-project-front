import React, { useEffect } from 'react';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import { motion } from "framer-motion";

const MainVocab = () => {
  const token = useAuthStore((state) => state.token);
  const category = useUserStore((state) => state.category);
  const getVocabCategory = useUserStore((state) => state.getVocabCategory);
  const allVocabulary = useUserStore((state) => state.allVocabulary)
  const getAllVocab = useUserStore((state) => state.getAllVocab)
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getVocabCategory(token);
      getAllVocab(token);
    }
  }, [token, getVocabCategory, getAllVocab]);


  const day = category.slice(0, 2);
  const animal = category.slice(2, 5);
  const art = category.slice(5, 7);
  const number = category.slice(7, 9);
  const food = category.slice(9, 12);
  const common = category.slice(12);

  console.log('all', allVocabulary)

  const countWordsInCategory = (categoryId) => {
    return allVocabulary.filter(item => item.categoryId === categoryId).length;
  };

  const hdlVocabClick = (categoryId) => {
    navigate(`/user/category/${categoryId}`);
  }

  return (
    <div>
      <div className='pt-20 text-[#22A094] dark:text-[#e7f4ef] mx-56'>
        <div className='flex flex-col'>
          <span className='text-2xl'>คำศัพท์</span>
          <span className='text-[#6E6E6E] dark:text-[#bfc5bdc7] mt-5'>หมวดหมู่</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-2xl mt-4'>วัน</span>
          <div className='mt-6 flex gap-6'>
            {day.map(item => (
              <motion.div
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
                onClick={() => hdlVocabClick(item.id)} key={item.id} className='rounded-xl bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[20rem] h-[9rem] flex items-center mb-4 dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]'>
                <div className='overflow-hidden m-4 rounded-xl h-[7rem] w-[7rem] bg-slate-200'>
                  <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                </div>
                <div className='text-left flex flex-col'>
                  <h1 className='text-2xl mt-4 font-semibold'>{item.name}</h1>
                  <h1 className='text-[#6e6e6ec7] dark:text-[#bfc5bdc7]  mt-4'>{countWordsInCategory(item.id)} คำศัพท์</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-2xl mt-4'>สัตว์</span>
          <div className='mt-6 flex gap-6'>
            {animal.map(item => (
              <motion.div
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
                onClick={() => hdlVocabClick(item.id)} key={item.id} className='rounded-xl bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[20rem] h-[9rem] flex items-center mb-4 dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]'>
                <div className='overflow-hidden m-4 rounded-xl h-[7rem] w-[7rem] bg-slate-200'>
                  <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                </div>
                <div className='text-left flex flex-col'>
                  <h1 className='text-2xl mt-4 font-semibold'>{item.name}</h1>
                  <h1 className='text-[#6e6e6ec7] dark:text-[#bfc5bdc7] mt-4'>{countWordsInCategory(item.id)} คำศัพท์</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-2xl mt-4'>ศิลปะ</span>
          <div className='mt-6 flex gap-6'>
            {art.map(item => (
              <motion.div
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
                onClick={() => hdlVocabClick(item.id)} key={item.id} className='rounded-xl bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[20rem] h-[9rem] flex items-center mb-4 dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]'>
                <div className='overflow-hidden m-4 rounded-xl h-[7rem] w-[7rem] bg-slate-200'>
                  <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                </div>
                <div className='text-left flex flex-col'>
                  <h1 className='text-2xl mt-4 font-semibold'>{item.name}</h1>
                  <h1 className='text-[#6e6e6ec7] dark:text-[#bfc5bdc7] mt-4'>{countWordsInCategory(item.id)} คำศัพท์</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-2xl mt-4'>ตัวเลข</span>
          <div className='mt-6 flex gap-6'>
            {number.map(item => (
              <motion.div
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
                onClick={() => hdlVocabClick(item.id)} key={item.id} className='rounded-xl bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[20rem] h-[9rem] flex items-center mb-4 dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1]'>
                <div className='overflow-hidden m-4 rounded-xl h-[7rem] w-[7rem] bg-slate-200'>
                  <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                </div>
                <div className='text-left flex flex-col'>
                  <h1 className='text-2xl mt-4 font-semibold'>{item.name}</h1>
                  <h1 className='text-[#6e6e6ec7] dark:text-[#bfc5bdc7] mt-4'>{countWordsInCategory(item.id)} คำศัพท์</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-2xl mt-4'>อาหาร</span>
          <div className='mt-6 flex gap-6'>
            {food.map(item => (
              <motion.div
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
                onClick={() => hdlVocabClick(item.id)} key={item.id} className='rounded-xl bg-[#E2FAF8] dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1] hover:bg-[#cbf5f1] w-[20rem] h-[9rem] flex items-center mb-4'>
                <div className='overflow-hidden m-4 rounded-xl h-[7rem] w-[7rem] bg-slate-200'>
                  <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                </div>
                <div className='text-left flex flex-col'>
                  <h1 className='text-2xl mt-4 font-semibold'>{item.name}</h1>
                  <h1 className='text-[#6e6e6ec7] dark:text-[#bfc5bdc7] mt-4'>{countWordsInCategory(item.id)} คำศัพท์</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='flex flex-col'>
          <span className='text-2xl mt-4'>ประโยคทั่วไป</span>
          <div className='mt-6 flex flex-wrap gap-6'>
            {common.map(item => (
              <motion.div
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.3 }}
                onClick={() => hdlVocabClick(item.id)} key={item.id} className='rounded-xl bg-[#E2FAF8] dark:bg-[#6E6E6E] dark:text-[#e7f4ef] dark:hover:bg-[#a1a1a1a1] hover:bg-[#cbf5f1] w-[20rem] h-[9rem] flex items-center mb-4'>
                <div className='overflow-hidden m-4 rounded-xl h-[7rem] w-[7rem] bg-slate-200'>
                  <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                </div>
                <div className='text-left flex flex-col'>
                  <h1 className='text-2xl mt-4 font-semibold'>{item.name}</h1>
                  <h1 className='text-[#6e6e6ec7] dark:text-[#bfc5bdc7] mt-4'>{countWordsInCategory(item.id)} คำศัพท์</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainVocab;
