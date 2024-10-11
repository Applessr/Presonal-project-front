import React, { useEffect } from 'react'
import useAdminStore from '../../store/admin-store'
import useAuthStore from '../../store/auth-store';
import useUserStore from '../../store/user-store';



const VocabularySum = () => {
    const token = useAuthStore((state) => state.token);
    const category = useUserStore((state) => state.category);
    const getVocabCategory = useUserStore((state) => state.getVocabCategory);
    const getAllVocab = useUserStore((state) => state.getAllVocab);
    const allVocabulary = useUserStore((state) => state.allVocabulary);

    useEffect(()=> {
        
        getAllVocab(token)
        getVocabCategory(token)
    },[token])
    return (
        <div className="stats stats-vertical ml-4 shadow text-center dark:text-[#2C2C2A]">
            
            <div className="stat">
                <div className="stat-title">Vocabulary Category</div>
                <div className="stat-value">{category.length}</div>
            </div>

            <div className="stat">
                <div className="stat-title">Vocabulary totals</div>
                <div className="stat-value">{allVocabulary.length}</div>
            </div>
        </div>
    )
}

export default VocabularySum
