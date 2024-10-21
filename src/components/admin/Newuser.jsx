import useAdminStore from '@/src/store/admin-store';
import useAuthStore from '@/src/store/auth-store';
import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Newuser = () => {
    const token = useAuthStore((state) => state.token);
    const userInfo = useAdminStore((state) => state.userInfo);
    const adminGetUserInfo = useAdminStore((state) => state.adminGetUserInfo);

    const today = new Date();
    const normalUser = userInfo?.userList?.filter(user => {
        const userCreatedAt = new Date(user.createdAt);

        return (
            user.Subscription?.status !== "ACTIVE" &&
            userCreatedAt.getDate() === today.getDate() &&
            userCreatedAt.getMonth() === today.getMonth() &&
            userCreatedAt.getFullYear() === today.getFullYear()
        );
    });


    const data = {
        labels: ['New users today'],
        datasets: [
            {
                label: 'users',
                data: [normalUser?.length, 10],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                text: 'New users',
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

export default Newuser
