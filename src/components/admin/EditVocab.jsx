import React, { useState } from 'react'
import useAdminStore from '../../store/admin-store';
import { toast } from 'react-toastify';

const initialState = {
    wordTh: "",
    wordEs: "",
    image: ""
};

const EditVocab = (props) => {
    const { token, categoryId,vocabularyId } = props

    const adminEditVocabulary = useAdminStore((state) => state.adminEditVocabulary);
    const adminVocabulary = useAdminStore((state) => state.adminVocabulary);

    const [body, setBody] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const hdlOnChange = (e) => {
        setBody({
            ...body,
            [e.target.name]: e.target.value
        });
    };

    const hdlSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await adminEditVocabulary(token, vocabularyId, body)
            toast.success('แก้ไขคำศัพท์เรียบร้อยแล้ว')
            adminVocabulary(token, categoryId)
            setBody(initialState)
            document.getElementById('edit_modal').close();
        } catch (err) {
            const errMsg = err.response?.data?.error || err.message;
            console.log(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <dialog id="edit_modal" className="modal">
            <div className="modal-box w-11/12 flex flex-col items-center">
                <h3 className="font-semibold text-primary text-xl mb-4">Edit vocabulary</h3>
                <button className="btn btn-sm text-xl btn-circle btn-ghost absolute right-2 top-2" onClick={e => (e.target.closest('dialog').close())}>✕</button>
                {loading ? (<span className="loading loading-ring loading-lg"></span>
                ) : (<form onSubmit={hdlSubmit} className='flex flex-col w-[24rem] gap-4 p-2'>
                    <span> Word in thai </span>
                    <input
                        onChange={hdlOnChange}
                        name='wordTh'
                        value={body.wordTh}
                        type="text"
                        className=' w-full ml-2 border border-gray-400 p-2 rounded-lg' />
                    <span> Word in Spanish </span>
                    <input
                        onChange={hdlOnChange}
                        name='wordEs'
                        value={body.wordEs}
                        type="text"
                        className='ml-2 border border-gray-400 p-2 rounded-lg' />
                    <span> Image URL </span>
                    <input
                        onChange={hdlOnChange}
                        name='image'
                        value={body.image}
                        type="text"
                        className='ml-2 border border-gray-400 p-2 rounded-lg' />
                    <button className="btn text-primary hover:bg-secondary border-2 border-primary ">Create</button>
                </form>)}
            </div>
        </dialog>
    )
}

export default EditVocab;
