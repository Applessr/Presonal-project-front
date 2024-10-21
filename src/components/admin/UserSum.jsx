import React, { useEffect } from 'react';
import useAdminStore from '../../store/admin-store';
import useAuthStore from '../../store/auth-store';



const UserSum = () => {
    const token = useAuthStore((state) => state.token);
    const userInfo = useAdminStore((state) => state.userInfo);
    const adminGetUserInfo = useAdminStore((state) => state.adminGetUserInfo);


    useEffect(() => {

        adminGetUserInfo(token)
    }, [])

    const subscriptUsers = userInfo?.userList?.filter(user => user.Subscription?.status === "ACTIVE");
    const normalUser = userInfo?.userList?.filter(user => user.Subscription?.status !== "ACTIVE");

    console.log(normalUser,'normalUser')

    return (
        <div className="ml-10 h-40 stats shadow text-center  dark:text-[#2C2C2A]">
            <div className="stat place-items-center">
                <div className="stat-title">Total Users</div>
                <div className="stat-value">{userInfo.userList?.length}</div>
            </div>

            {userInfo.userList && <div className="stat place-items-center">
                <div className="stat-title">Total subscript</div>
                <div className="stat-value text-primary">{subscriptUsers?.length}</div>
            </div>
            }
        </div>
    )
}

export default UserSum
