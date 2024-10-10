import React, { useEffect } from 'react'
import useAdminStore from '../../store/admin-store'
import useAuthStore from '../../store/auth-store';

const UserSum = () => {
    const token = useAuthStore((state) => state.token);
    const userInfo = useAdminStore((state) => state.userInfo);
    const adminGetUserInfo = useAdminStore((state) => state.adminGetUserInfo);

    useEffect(() => {

        adminGetUserInfo(token)
    }, [])

    return (
        <div className="ml-10 stats shadow text-center">
            <div className="stat place-items-center">
                <div className="stat-title">Total Page Views</div>
                <div className="stat-value">89,400</div>
                <div className="stat-desc">21% more than last month</div>
            </div>

            {userInfo.userList && <div className="stat place-items-center">
                <div className="stat-title">Users</div>
                <div className="stat-value text-primary">{userInfo.userList.length}</div>
                <div className="stat-desc text-primary">↗︎ 40 (2%)</div>
            </div>
}
        </div>
    )
}

export default UserSum
