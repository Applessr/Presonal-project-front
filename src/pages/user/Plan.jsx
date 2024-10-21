import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/auth-store';
import useSubscriptionStore from '../../store/subscription-store'
import { useNavigate } from 'react-router-dom';


const Plan = () => {
    const isDark = useAuthStore((state) => state.isDark);
    const hdlSelectPlan = useSubscriptionStore((state) => state.hdlSelectPlan);
    const navigate = useNavigate()


    const [selectedPlan, setSelectedPlan] = useState(null); 

    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
    };

    const handleConfirmPlan = async () => {
        if (selectedPlan) {
            await hdlSelectPlan(selectedPlan); 
            setSelectedPlan(null); 
            navigate('/user/upgrade/payment')
        } else {
            toast('กรุณาเลือกแพ็คเกจ!');
        }
    };

    const planClasses = (plan) =>
        `mt-4 text-black w-[30%] dark:text-white p-4 border-2 rounded-lg 
         ${selectedPlan === plan ? 'border-[#22A094] border-4' : 'border-[#8c8c8c83] dark:border-[#b4b4b4]'} 
         cursor-pointer`;

    return (
        <div className='pt-14'>
            <div className='flex flex-col items-center mt-24'>
                <div className='w-36'>
                    {isDark ? (
                        <img src="https://i.imgur.com/T8gF1pT.png" alt="External Logo" />
                    ) : (
                        <img src="https://i.imgur.com/yGPYlKm.png" alt="External Logo" />
                    )}
                </div>
                <div className='mt-4'>
                    <h1 className='text-2xl text-center'>เลือกแพ็คเกจของคุณ</h1>
                </div>

                <div
                    className={planClasses('TWELVE_MONTH')}
                    onClick={() => handleSelectPlan('TWELVE_MONTH')}
                >
                    <div className='flex items-center gap-2'>
                        <h1 className='text-2xl font-semibold'>12 เดือน</h1>
                        <span className='text-white bg-[#307CA6] rounded-md text-sm p-1'>ถูกกว่า 40%</span>
                    </div>
                    <h1>60 THB / เดือน</h1>
                    <h1 className='text-[#6E6E6E] dark:text-[#b4b4b4]'>
                        เรียกเก็บเงินรายปี 713 THB
                    </h1>
                </div>

                <div
                    className={planClasses('SIX_MONTH')}
                    onClick={() => handleSelectPlan('SIX_MONTH')}
                >
                    <div className='flex items-center gap-2'>
                        <h1 className='text-2xl font-semibold'>6 เดือน</h1>
                        <span className='text-white bg-[#307CA6] rounded-md text-sm p-1'>ถูกกว่า 15%</span>
                    </div>
                    <h1>85 THB / เดือน</h1>
                    <h1 className='text-[#6E6E6E] dark:text-[#b4b4b4]'>
                        เรียกเก็บเงินทุกครึ่งปีในราคา 505 THB
                    </h1>
                </div>

                <div
                    className={planClasses('ONE_MONTH')}
                    onClick={() => handleSelectPlan('ONE_MONTH')}
                >
                    <h1 className='text-2xl font-semibold'>1 เดือน</h1>
                    <h1>99 THB / เดือน</h1>
                    <h1 className='text-[#6E6E6E] dark:text-[#b4b4b4]'>
                        เรียกเก็บเงินทุกเดือนในราคา 99 THB
                    </h1>
                </div>

                <button
                    className='btn border-2 hover:bg-[#E2FAF8] dark:hover:bg-[#e7f4ef49] mt-4 text-xl'
                    onClick={handleConfirmPlan}
                >
                    เลือกแพ็คเกจนี้
                </button>
            </div>
        </div>
    );
};

export default Plan;