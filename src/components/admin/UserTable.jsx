import React, { useEffect } from 'react'
import useAuthStore from '../../store/auth-store';
import useAdminStore from '../../store/admin-store';
import TimeAgo from 'react-timeago';
import { toast } from 'react-toastify';

const UserTable = () => {
    const token = useAuthStore((state) => state.token);
    const adminGetUserInfo = useAdminStore((state) => state.adminGetUserInfo);
    const userInfo = useAdminStore((state) => state.userInfo);
    const adminUpdateUserRole = useAdminStore((state) => state.adminUpdateUserRole);


    useEffect(() => {
        if (token) {

            adminGetUserInfo(token);
        }

    }, [token])

    const hdlUpdateMember = async (e, id) => {
        const role = e.target.value
        try {
            const result = await adminUpdateUserRole(token, id, { role })
            toast.success('update role success')
        } catch (err) {
            console.log('Error from update', err)
        }
    };

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                        E-mail
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Membership duration
                    </th>
                </tr>
            </thead>
            <tbody>
                {userInfo.userList && userInfo.userList.map((item) => (
                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50 ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.id}
                        </th>
                        <td className="px-6 py-4">
                            {item.username}
                        </td>
                        <td className="px-6 py-4">
                            {item.email}
                        </td>
                        <td className="px-6 py-4">
                            <select
                                className='rounded-md'
                                defaultValue={item.role}
                                onChange={(e) => hdlUpdateMember(e, item.id)}
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
                        </td>
                        <td className="px-6 py-4">
                            <TimeAgo date={item.createdAt} />
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserTable
