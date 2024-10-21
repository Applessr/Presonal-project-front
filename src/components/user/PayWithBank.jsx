import React, { useState } from 'react'
import useAuthStore from '../../store/auth-store';
import useSubscriptionStore from '../../store/subscription-store';
import { toast } from "react-toastify";
import Script from "react-load-script";
import { useNavigate } from 'react-router-dom';


let OmiseCard;

const PayWithBank = () => {
    const token = useAuthStore((state) => state.token);
    const createBankSubscript = useSubscriptionStore((state) => state.createBankSubscript);
      const plan = useSubscriptionStore((state) => state.plan);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const currentUserStore = useAuthStore((state)=> state.currentUserStore)

    const priceMap = {
        ONE_MONTH: 99 * 100,
        SIX_MONTH: 505 * 100,
        TWELVE_MONTH: 713 * 100,
    };

    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
            publicKey: import.meta.env.VITE_OMISE_PUBLIC_KEY,
            currency: "THB",
            frameLabel: "Spanify",
            submitLabel: "Pay Now",
            buttonLabel: "Pay with Omise",
        });
    };

    const handleInternetBankingPayment = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'internet_banking',
            otherPaymentMethods: [
                "internet_banking_bbl",
                "internet_banking_bay"
            ],
        });
    
        OmiseCard.open({
            amount: priceMap[plan],
            onCreateTokenSuccess: (omiseToken) => {
                console.log("Token Created:", omiseToken);
                hdlPayment(omiseToken, plan);
            },
            onFormClosed: () => {
                console.log("Form closed");
            },
        });
    };

    const hdlPayment = async (omiseToken, plan) => {
        setLoading(true);
        try {
            console.log("Sending payload:", { plan, token: omiseToken });
            const result = await createBankSubscript(token, plan, omiseToken);
            console.log("Subscription:", result);
            toast.success("Payment Successful!");
            currentUserStore(token);
            navigate('/subscript/success');
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error(`Payment Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className='w-[30%] mt-4'>
       <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
            <form >
                <button
                    type="button"
                    id="internet-banking"
                    onClick={handleInternetBankingPayment}
                    className={`btn cursor-pointer w-full  ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    {loading ? 'กำลังดำเนินการ...' : 'ชำระเงินผ่าน Internet Banking'}
                </button>
            </form>
    </div>
  )
}

export default PayWithBank;
