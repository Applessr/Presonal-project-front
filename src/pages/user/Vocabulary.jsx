import React, { useEffect } from 'react'
import Footer from '../../components/Footer'
import { HiOutlineStar } from "react-icons/hi2";
import { HiStar } from "react-icons/hi2";
import useUserStore from '../../store/user-store';
import { useParams } from 'react-router-dom';
import useAuthStore from '../../store/auth-store';
import { ImTelegram } from 'react-icons/im';

const Vocabulary = () => {
    const token = useAuthStore((state) => state.token);
    const vocabulary = useUserStore((state) => state.vocabulary);
    const getVocabulary = useUserStore((state) => state.getVocabulary);
    const { categoryId } = useParams();

    const onlyVocab = vocabulary?.vocabulary || [];
    console.log(onlyVocab);

    useEffect(() => {
        if (token && categoryId) {
            getVocabulary(token, categoryId);
        }
    }, [token, categoryId, getVocabulary]);

    if (!vocabulary) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    return (
        <div className='pt-20'>
            <div className='mx-56'>
                <div className='flex gap-4'>
                    <div className='w-32 h-32 bg-slate-300 rounded-md overflow-hidden'>
                        <div><img src={vocabulary.image} alt="vocabulary" /></div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-semibold text-[#22A094]'>{vocabulary.name}</span>
                        <span className='text-xl text-[#307CA6]'>{vocabulary.nameES}</span>
                        <span className='text-[#6E6E6E]'>{onlyVocab.length} คำศัพท์</span>
                    </div>
                </div>

                <ul className='mt-12'>
                    {onlyVocab.map((item) => (
                        <li key={item.id} className='grid grid-cols-[auto,1fr] items-center mt-5 gap-2'>
                            <div className='flex items-center gap-8'>
                                <div className='w-20 h-10 bg-slate-400 rounded-md overflow-hidden'>
                                    <img src={item.image} alt="pic" />
                                </div>
                                <span className='text-xl font-medium'>{item.wordEs}</span> 
                            </div>
                            <div className='flex justify-between items-center ml-2 gap-2'>
                                <span>{item.wordTh}</span>
                                <HiOutlineStar className='w-7 h-7 text-[#6E6E6E]' />
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
