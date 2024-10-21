import React, { useState } from 'react'
import useAdminStore from '../../store/admin-store';
import { toast } from 'react-toastify';

const initialState = {
    wordTh: "",
    wordEs: "",
    image: ""
};

const CreateVocab = (props) => {
    const { token, categoryId } = props

    const adminCreateVocabulary = useAdminStore((state) => state.adminCreateVocabulary);
    const adminVocabulary = useAdminStore((state) => state.adminVocabulary);

    const [body, setBody] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const hdlOnChange = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        });
    };
    const validateVocab = () => {
        const { wordTh, wordEs, image } = body;
        if (!wordTh) {
            toast.info('กรุณากรอกคำศัพท์ภาษาไทย');
            return false;
        }
        if (!wordEs) {
            toast.info('กรุณากรอกคำศัพท์ภาษาสเปน');
            return false;
        }
        if (!image) {
            toast.info('กรุณาใส่ลิงค์รูปภาพ');
            return false;
        }
        return true;
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        if (!validateVocab()) return;
        try {
            setLoading(true);
            if (!categoryId) {
                toast.error('category ID is incorrect')
            }
            if (!body) {
                toast.error('all input is require')
            }
            
            await adminCreateVocabulary(token, categoryId, body)
            toast.success('สร้างคำศัพท์ใหม่เรียบร้อยแล้ว')
            adminVocabulary(token, categoryId)

            setBody(initialState)
            document.getElementById('create_modal').close();
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message;
            console.log(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="create_modal" className="modal">
            <div className="modal-box w-11/12 flex flex-col items-center dark:bg-[#2C2C2A]">
                <h3 className="font-semibold text-primary text-xl mb-4">Crete new vocabulary</h3>
                <button className="btn btn-sm text-xl btn-circle btn-ghost absolute right-2 top-2" onClick={e => (e.target.closest('dialog').close())}>✕</button>
                {loading ? (<span className="loading loading-ring loading-lg"></span>
                ) : (<form onSubmit={hdlSubmit} className='flex flex-col w-[24rem] gap-4 p-2 '>
                    <span> Word in thai </span>
                    <input
                        onChange={hdlOnChange}
                        name='wordTh'
                        value={body.wordTh}
                        type="text"
                        className='text-black w-full border border-gray-400 p-2 rounded-lg' />
                    <span> Word in Spanish </span>
                    <input
                        onChange={hdlOnChange}
                        name='wordEs'
                        value={body.wordEs}
                        type="text"
                        className='text-black w-full border border-gray-400 p-2 rounded-lg' />
                    <span> Image URL </span>
                    <input
                        onChange={hdlOnChange}
                        name='image'
                        value={body.image}
                        type="text"
                        className='text-black w-full  border border-gray-400 p-2 rounded-lg' />
                    <button className="btn  w-[23rem] self-center text-primary hover:bg-secondary border-2 border-primary ">Create</button>
                </form>)}
            </div>
        </dialog>
    )
}

export default CreateVocab
