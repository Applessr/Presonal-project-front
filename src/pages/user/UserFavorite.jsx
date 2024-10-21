import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import useUserStore from '../../store/user-store';
import useAuthStore from '../../store/auth-store';
import { HiOutlineStar, HiStar } from "react-icons/hi2";
import { AiOutlineSound } from "react-icons/ai";

const UserFavorite = () => {
  const token = useAuthStore((state) => state.token);
  const getFavoriteVocab = useUserStore((state) => state.getFavoriteVocab);
  const favorite = useUserStore((state) => state.favorite);
  const createFavoriteVocab = useUserStore((state) => state.createFavoriteVocab);
  const deleteFavoriteVocab = useUserStore((state) => state.deleteFavoriteVocab);

  console.log('user favorite', favorite);

  useEffect(() => {
    if (token) {
      getFavoriteVocab(token);
    }
  }, [token, getFavoriteVocab]);

  const isFavorite = (vocabularyId) => {
    return favorite.some((item) => item.vocabularyId === vocabularyId);

  };

  const handleFavoriteToggle = async (vocabularyId) => {
    try {
      if (isFavorite(vocabularyId)) {
        await deleteFavoriteVocab(token, vocabularyId);
      } else {
        await createFavoriteVocab(token, vocabularyId);
      }
      await getFavoriteVocab(token);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const listenToTranslation = (text, lang) => {
    const word = new SpeechSynthesisUtterance(text);
    word.lang = lang === 'es' ? 'es-ES' : 'th-TH';
    speechSynthesis.speak(word);
  };


  return (
    <div className='pt-20 min-h-screen'>
      <div className='mx-36 min-h-[66vh]'>
        <h1 className='text-2xl text-[#22A094]'>รายการโปรด</h1>
        <ul>
          {favorite.map(item => (
            <li key={item.id} className='grid grid-cols-[auto,1fr] items-center mt-5 gap-2'>
              <div className='flex items-center gap-8'>
                <div className='w-20 h-10 bg-slate-400 rounded-md overflow-hidden'>
                  <img src={item.vocabulary.image} alt="pic" />
                </div>
                <span
                  className='w-12 h-12 rounded-full flex items-center justify-center active:bg-slate-300 '
                  onClick={() => listenToTranslation(item.vocabulary.wordEs, 'es')}
                >
                  <AiOutlineSound className='w-7 h-7 active:text-black cursor-pointer' />
                </span>
                <span className='text-xl font-medium'>{item.vocabulary.wordEs}</span>
              </div>
              <div className='flex justify-between items-center ml-2 gap-2'>
                <span>{item.vocabulary.wordTh}</span>
                <div
                  className='hover:scale-110 hover:cursor-pointer'
                  onClick={() => handleFavoriteToggle(item.vocabularyId)}>
                  {isFavorite(item.vocabularyId) ? (
                    <HiStar className='w-7 h-7 text-[#f3de6b]' />
                  ) : (
                    <HiOutlineStar className='w-7 h-7 text-[#6E6E6E]' />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default UserFavorite;