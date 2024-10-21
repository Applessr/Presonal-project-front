import React, { useState } from 'react';
import useAuthStore from '../../store/auth-store';
import useSubscriptionStore from '../../store/subscription-store';
import { toast } from "react-toastify";
import Script from "react-load-script";
import { useNavigate } from 'react-router-dom';

let OmiseCard;

const PayWithCard = () => {
    const token = useAuthStore((state) => state.token);
    const createSubscript = useSubscriptionStore((state) => state.createSubscript);
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

    const handleCardPayment = () => {
        OmiseCard.configure({
            defaultPaymentMethod: 'credit_card',
            otherPaymentMethods: [],
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
            const result = await createSubscript(token, plan, omiseToken);
            console.log("Subscription:", result);
            toast.success("Payment Successful!");
            await currentUserStore(token);
            navigate('/subscript/success');
        } catch (error) {
            console.error("Payment Error:", error);
            toast.error(`Payment Failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[30%]'>
            <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
            <form>
                <button
                    type="button"
                    id="credit-card"
                    onClick={handleCardPayment}
                    className={`btn cursor-pointer w-full ${loading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    {loading ? 'กำลังดำเนินการ...' : 'ชำระเงินผ่านบัตรเครดิต'}
                </button>
            </form>
        </div>
    );
};

export default PayWithCard;