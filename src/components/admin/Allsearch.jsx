import React, { useEffect } from 'react'
import useAdminStore from '../../store/admin-store';
import useAuthStore from '../../store/auth-store';

const Allsearch = () => {
    const token = useAuthStore((state) => state.token);
    const allSearch = useAdminStore((state) => state.allSearch);
    const adminGetAllSearch = useAdminStore((state) => state.adminGetAllSearch);

    useEffect(() => {

        adminGetAllSearch(token)
    }, [])

    const result = allSearch.reduce((acc, item) => {
        acc[item.searchTerm] = (acc[item.searchTerm] || 0) + 1;

        return acc;
    }, {});

    const sortedArray = Object.entries(result)
        .sort((a, b) => b[1] - a[1]); 

    const sortedResult = sortedArray.map(([key, value]) => ({ word: key, total: value }));

    console.log(sortedResult, 'sortedResult');


    return (
        <div className="ml-10 stats shadow text-center  dark:text-[#2C2C2A]">
            <div className="stat place-items-center">
                <div className="stat-title">All search term</div>
                <div className="stat-value">{allSearch.length}</div>
            </div>
            {allSearch && <div className="stat place-items-center">
                <div className="stat-title">Top search word</div>

                <table className="table text-lg flex-1">
                    <thead>
                        <tr>
                            <th className='text-center text-xl font-semibold'>Rank</th>
                            <th className='text-center text-xl font-semibold'>Word</th>
                            <th className='text-center text-xl font-semibold'>total</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {sortedResult[0]  && (
                            <tr className="text-black text-center">
                                <th>1</th>
                                <td className='text-xl text-primary'>"{sortedResult[0].word}"</td>
                                <td>{sortedResult[0].total}</td>
                            </tr>
                        )}
                        {sortedResult[1] && (
                            <tr className="text-black text-center">
                                <th>2</th>
                                <td className='text-xl'>{sortedResult[1].word}</td>
                                <td>{sortedResult[1].total}</td>
                            </tr>
                        )}
                        {sortedResult[2] &&  (
                            <tr className="text-black text-center">
                                <th>3</th>
                                <td>{sortedResult[2].word}</td>
                                <td>{sortedResult[2].total}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default Allsearch
