import useAdminStore from '@/src/store/admin-store';
import useAuthStore from '@/src/store/auth-store';
import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NewSubscript = () => {
    const token = useAuthStore((state) => state.token);
    const userInfo = useAdminStore((state) => state.userInfo);
    const adminGetUserInfo = useAdminStore((state) => state.adminGetUserInfo);

    const today = new Date();
    const usersWithTodaySubscription = userInfo?.userList?.filter(user => {
        const subscriptionCreatedAt = new Date(user.Subscription?.createdAt);

        return (
            user.Subscription?.status === "ACTIVE" &&
            subscriptionCreatedAt.getDate() === today.getDate() &&
            subscriptionCreatedAt.getMonth() === today.getMonth() &&
            subscriptionCreatedAt.getFullYear() === today.getFullYear()
        );
    });


    const data = {
        labels: ['New subscript today'],
        datasets: [
            {
                label: 'subscript',
                data: [usersWithTodaySubscription?.length, 10],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'New subscript',
            },
        },
    };

    useEffect(() => {

        adminGetUserInfo(token)
    }, [])


    return (
        <div className='bg-white'>
            <Bar data={data} options={options} />
        </div>
    )
}

export default NewSubscript
