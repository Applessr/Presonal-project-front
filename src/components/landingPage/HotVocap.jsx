import React, { useEffect } from 'react'
import useAuthStore from '../../store/auth-store';
import useUserStore from '../../store/user-store';
import { useNavigate } from 'react-router-dom';

const Hotvocap = () => {
    const token = useAuthStore((state) => state.token);
    const category = useUserStore((state) => state.category);
    const getVocabCategory = useUserStore((state) => state.getVocabCategory);
    const allVocabulary = useUserStore((state) => state.allVocabulary)
    const getAllVocab = useUserStore((state) => state.getAllVocab)
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (token) {
            getVocabCategory(token);
            getAllVocab(token);
        }
    }, [token, getVocabCategory]);

    const countWordsInCategory = (categoryId) => {
        return allVocabulary.filter(item => item.categoryId === categoryId).length;
    };
    const Hotvocap = [
        ...category.slice(0, 2),
        ...category.slice(4, 8)
    ];
    
    const hdlVocabClick = (categoryId) => {
        if (!user) {
            document.getElementById('login_modal').showModal();
        } else {
            navigate(`/user/category/${categoryId}`);
        }
    }

    const hdlLearnMore = () => {
        if (!user) {
            document.getElementById('login_modal').showModal();
        } else {

            navigate(`/user/category`);
        }
    }

    return (
        <div className='flex flex-col gap-5 m-10'>
            <div className='flex gap-5 justify-center '>
                <div className='mt-6 grid grid-cols-[1fr,1fr,1fr] mx-20 justify-center gap-6'>
                    {Hotvocap.map(item => (
                        <div onClick={() => hdlVocabClick(item.id)} key={item.id} className='rounded-xl bg-[#E2FAF8] hover:bg-[#cbf5f1] w-[20rem] h-[9rem] flex items-center mb-4'>
                            <div className='overflow-hidden m-4 rounded-xl h-[7rem] w-[7rem] bg-slate-200'>
                                <img className='w-full h-full object-cover' src={item.image} alt={item.name} />
                            </div>
                            <div className='text-left flex flex-col'>
                                <h1 className='text-2xl mt-4 font-semibold'>{item.name}</h1>
                                <h1 className='text-[#6e6e6ec7] mt-4'>{countWordsInCategory(item.id)} คำศัพท์</h1>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-8'>
                <button
                    className='text-xl border-2 border-[#22A094] p-1 rounded-md hover:bg-[#E2FAF8]'
                    onClick={hdlLearnMore}
                >
                    ดูคำศัพท์เพิ่มเติม
                </button>
            </div>
        </div>
    )
}

export default Hotvocap
