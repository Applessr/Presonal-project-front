import React, { useState } from "react";
import useSubscriptionStore from "../../store/subscription-store";
import PayWithCard from "../../components/user/PayWithCard";
import PayWithBank from "../../components/user/PayWithBank";



const Payment = () => {
    const plan = useSubscriptionStore((state) => state.plan);

    const planDetails = {
        ONE_MONTH: {
            title: '1 เดือน',
            price: '99 THB / เดือน',
            description: 'เรียกเก็บเงินทุกเดือนในราคา 99 THB',
        },
        SIX_MONTH: {
            title: '6 เดือน',
            price: '85 THB / เดือน',
            description: 'เรียกเก็บเงินทุกครึ่งปีในราคา 505 THB',
            discountLabel: 'ถูกกว่า 15%',
        },
        TWELVE_MONTH: {
            title: '12 เดือน',
            price: '60 THB / เดือน',
            description: 'เรียกเก็บเงินรายปี 713 THB',
            discountLabel: 'ถูกกว่า 40%',
        },
    };


    return (
        <div className="own-form flex flex-col items-center justify-center h-screen">
            <div className="w-[30%] bg-[#E2FAF8] dark:bg-[#6E6E6E] p-2 rounded-lg mb-6">
                <h1>แพ็คเก็จที่คุณเลือก</h1>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold">{planDetails[plan]?.title}</h1>
                    {planDetails[plan]?.discountLabel && (
                        <span className="text-white bg-[#307CA6] rounded-md text-sm p-1">
                            {planDetails[plan].discountLabel}
                        </span>
                    )}
                </div>
                <h1>{planDetails[plan]?.price}</h1>
                <h1 className="text-[#6E6E6E] dark:text-[#b4b4b4]">
                    {planDetails[plan]?.description}
                </h1>
            </div>
            <PayWithCard />
            <PayWithBank />
        </div>
    );
};

export default Payment;