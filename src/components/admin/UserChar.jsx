import React, { useEffect } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useAdminStore from '@/src/store/admin-store';
import useAuthStore from '@/src/store/auth-store';

ChartJS.register(ArcElement, Tooltip, Legend);



const UserChar = () => {
    const token = useAuthStore((state) => state.token);
    const userInfo = useAdminStore((state) => state.userInfo);
    const adminGetUserInfo = useAdminStore((state) => state.adminGetUserInfo);

    useEffect(() => {
        adminGetUserInfo(token);
    }, [token, adminGetUserInfo]);

    console.log(userInfo, ' userInfo');


    const subscriptUsers = userInfo?.userList?.filter(user => user.Subscription?.status === "ACTIVE") || [];
    const normalUser = userInfo?.userList?.filter(user => user.Subscription?.status !== "ACTIVE") || [];

    const data = {
        labels: ['Normal users', 'Subscript'],
        datasets: [
            {
                label: '# of Users',
                data: [normalUser?.length, subscriptUsers?.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='w-[250px]'>
            <Pie data={data} />
        </div>
    );
};

export default UserChar
