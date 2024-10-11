import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/auth-store';
import useAdminStore from '../../store/admin-store';
import TimeAgo from 'react-timeago';
import CreateVocab from './CreateVocab';
import { toast } from 'react-toastify';
import EditVocab from './EditVocab';

const VocabTable = () => {
    const token = useAuthStore((state) => state.token);
    const adminVocabulary = useAdminStore((state) => state.adminVocabulary);
    const adminVocab = useAdminStore((state) => state.adminVocab);
    const adminDeleteVocabulary = useAdminStore((state) => state.adminDeleteVocabulary);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [categoryId, setCategoryId] = useState(null);
    const [vocabularyId, setVocabularyId] = useState(null);



    useEffect(() => {
        const fetchVocabulary = async () => {

            await adminVocabulary(token, selectedCategory);
        };

        if (token) {
            fetchVocabulary();
        }
    }, [token, selectedCategory, adminVocabulary]);

    const hdlCategory = (e) => {
        const selectedCategory = parseInt(e.target.value, 10);
        setSelectedCategory(selectedCategory);
        setCategoryId(selectedCategory);
    };
    const hdlDelete = async (vocabularyId) => {
        try {
            await adminDeleteVocabulary(token, vocabularyId)
            toast.success('Delete Vocabulary success')
            adminVocabulary(token, categoryId)
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }

    };
    const hdlEdit = (vocabId) => {
        setVocabularyId(vocabId); 
        document.getElementById('edit_modal').showModal();
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='flex gap-3 text-[#2C2C2A]'>
                <h1 className='dark:text-[#E7F4EF]'>เลือกหมวดหมูคำศัพท์ : </h1>
                <select
                    value={selectedCategory}
                    onChange={hdlCategory}
                    className='rounded-md mb-4'>
                    <option value={1}>วันในสัปดาห์</option>
                    <option value={2}>เดือน</option>
                    <option value={3}>สัตว์น้ำ</option>
                    <option value={4}>แมลง และแมง</option>
                    <option value={5}>สัตว์</option>
                    <option value={6}>สี</option>
                    <option value={7}>รูปทรง</option>
                    <option value={8}>ตัวเลข</option>
                    <option value={9}>การบอกเวลา</option>
                    <option value={10}>ผลไม้</option>
                    <option value={11}>อาหาร</option>
                    <option value={12}>เครื่องดื่ม</option>
                    <option value={13}>ประโยคในชีวิตประจำวัน</option>
                    <option value={14}>อารมณ์</option>
                    <option value={15}>ประโยคคำถาม</option>
                    <option value={16}>ครอบครัว</option>
                </select>
            </div>
            <div className="overflow-x-auto w-full h-[32rem]">
                <table className="text-sm text-left rtl:text-right text-gray-500 rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-8 py-3">ID</th>
                            <th scope="col" className="px-8 py-3">THAI</th>
                            <th scope="col" className="px-8 py-3">SPANISH</th>
                            <th scope="col" className="px-8 py-3">Image</th>
                            <th scope="col" className="px-10 py-3">Updated Date</th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                            <th scope="col" className="px-8 py-3"><button onClick={() => document.getElementById('create_modal').showModal()} className='bg-secondary text-primary p-2 border-2 rounded-md border-primary font-normal hover:bg-[#c7edeac5]'>create</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminVocab.vocabList && adminVocab.vocabList.map((vocab) => (
                            <tr key={vocab.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {vocab.id}
                                </th>
                                <td className="px-6 py-4">{vocab.wordTh}</td>
                                <td className="px-6 py-4">{vocab.wordEs}</td>
                                <td className="px-6 py-4 w-11 overflow-hidden">
                                    {vocab.image.length > 20 ? `${vocab.image.substring(0, 20)}...` : vocab.image}
                                </td>
                                <td className="px-6 py-4 w-11 overflow-hidden"><TimeAgo date={vocab.updatedAt} /></td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" onClick={() => hdlEdit(vocab.id)}
                                        className="font-medium text-[#307CA6] hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a onClick={() => hdlDelete(vocab.id)}
                                        className="font-medium text-[#DB5252] hover:underline">Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <EditVocab categoryId={categoryId} vocabularyId={vocabularyId} token={token} />
                <CreateVocab categoryId={categoryId} token={token} />
            </div>
        </div>
    );
}

export default VocabTable;