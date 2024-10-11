import React, { useEffect } from 'react';
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import useUserStore from '../store/user-store';
import useAuthStore from '../store/auth-store';

const WordDay = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const wordOfTheDay = useUserStore((state) => state.wordOfTheDay);
  const getRandomWord = useUserStore((state) => state.getRandomWord);
  const favorite = useUserStore((state) => state.favorite);
  const getFavoriteVocab = useUserStore((state) => state.getFavoriteVocab);
  const createFavoriteVocab = useUserStore((state) => state.createFavoriteVocab);
  const deleteFavoriteVocab = useUserStore((state) => state.deleteFavoriteVocab);

  useEffect(() => {
    getRandomWord();
    if (token) {

      getFavoriteVocab(token);
    }
  }, [getRandomWord, getFavoriteVocab, token, user]);

  const isFavorite = (vocabId) => {
    if (user) {
      return favorite.some((item) => item.vocabularyId === vocabId);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!wordOfTheDay) return;

    const vocabId = wordOfTheDay.id;
    if (isFavorite(vocabId)) {
      await deleteFavoriteVocab(token, vocabId);
    } else {
      await createFavoriteVocab(token, vocabId);
    }
    await getFavoriteVocab(token);
  };

  return (
    <div className='flex justify-center mt-20 '>
      <div className='bg-[#E2FAF8] dark:bg-[#6E6E6E] text-[#6e6e6ec7] w-[45%] p-4 flex flex-col items-center rounded-xl dark:text-[#e7f4ef] '>
        <h1 className='text-xl font-light mb-4'>คำน่ารู้</h1>
        <div className='w-24 h-24 rounded-md overflow-hidden bg-slate-300'>
          <img
            className='w-full h-full object-cover'
            src={wordOfTheDay ? wordOfTheDay.image : 'https://i.imgur.com/09ssq0l.jpeg'}
            alt='คำน่ารู้'
          />
        </div>
        <h1 className='text-2xl font-bold mt-4 text-[#22A094] dark:text-[#45bcb0]'>{wordOfTheDay ? wordOfTheDay.wordEs : '...'}</h1>
        <h1 className='text-xl font-light mb-4'>{wordOfTheDay ? wordOfTheDay.wordTh : '...'}</h1>
        <h1 className='flex text-xl font-light mb-4'>
          <div
            className='hover:scale-110 hover:cursor-pointer'
            onClick={handleFavoriteToggle}
          >
            {wordOfTheDay && isFavorite(wordOfTheDay.id) ? (
              <HiStar className='w-7 h-7 text-[#f3de6b]' />
            ) : (
              <HiOutlineStar className='w-7 h-7' />
            )}
          </div>
          บันทึกไปยังรายการโปรด
        </h1>
      </div>
    </div>
  );
}

export default WordDay;