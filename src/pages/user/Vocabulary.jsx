import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import { HiOutlineStar, HiStar } from "react-icons/hi2"; 
import useUserStore from '../../store/user-store';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';
import { ImTelegram } from 'react-icons/im';

const Vocabulary = () => {
    const token = useAuthStore((state) => state.token);
    const vocabulary = useUserStore((state) => state.vocabulary);
    const getVocabulary = useUserStore((state) => state.getVocabulary);
    const favorite = useUserStore((state) => state.favorite);
    const getFavoriteVocab = useUserStore((state) => state.getFavoriteVocab);
    const createFavoriteVocab = useUserStore((state) => state.createFavoriteVocab);
    const deleteFavoriteVocab = useUserStore((state) => state.deleteFavoriteVocab);
    const { categoryId } = useParams();

    const onlyVocab = vocabulary?.vocabulary || [];
    
   
    const isFavorite = (vocabularyId) => {
        return favorite.some((item) => item.vocabularyId === vocabularyId);
    };

    const handleFavoriteToggle = async (vocabularyId) => {
        if (isFavorite(vocabularyId)) {
            await deleteFavoriteVocab(token, vocabularyId); 
        } else {
            await createFavoriteVocab(token, vocabularyId); 
        }
        await getFavoriteVocab(token);
    };

    useEffect(() => {
        if (token && categoryId) {
            getVocabulary(token, categoryId);
            getFavoriteVocab(token);
        }
    }, [token, categoryId, getVocabulary, getFavoriteVocab]);

    if (!vocabulary) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    return (
        <div className='pt-20 min-h-screen'>
            <div className='mx-56 mb-32'>
                <div className='flex gap-4'>
                    <div className='w-32 h-32 bg-slate-300 rounded-md overflow-hidden'>
                        <div><img src={vocabulary.image} alt="vocabulary" /></div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold text-[#22A094] dark:text-[#e7f4ef]'>{vocabulary.name}</span>
                        <span className='text-xl text-[#307CA6]'>{vocabulary.nameES}</span>
                        <span className='text-[#6E6E6E]'>{onlyVocab.length} คำศัพท์</span>
                    </div>
                </div>

                <ul className='mt-12 '>
                    {onlyVocab.map((item) => (
                        <li key={item.id} className='grid grid-cols-[auto,1fr] items-center mt-5 gap-2 text-black dark:text-white'>
                            <div className='flex items-center gap-8'>
                                <div className='w-20 h-10 bg-slate-400 rounded-md overflow-hidden'>
                                    <img src={item.image} alt="pic" />
                                </div>
                                <span className='text-xl font-medium'>{item.wordEs}</span>
                            </div>
                            <div className='flex justify-between items-center ml-2 gap-2'>
                                <span>{item.wordTh}</span>
                                <div 
                                className='hover:scale-110 hover:cursor-pointer'
                                onClick={() => handleFavoriteToggle(item.id)}>
                                    {isFavorite(item.id) ? (
                                        <HiStar className='w-7 h-7 text-[#f3de6b]' /> // ไอคอน star ถ้าเป็น favorite
                                    ) : (
                                        <HiOutlineStar className='w-7 h-7 text-[#6E6E6E]' /> // ไอคอน outline ถ้าไม่เป็น favorite
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
};

export default Vocabulary;