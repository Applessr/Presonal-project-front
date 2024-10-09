import React from 'react'

const ManageUser = () => {
  return (
    <div className='bg-[#E2FAF8] min-h-screen w-screen flex justify-center '>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b hover:bg-gray-50 ">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Silver
              </td>
              <td class="px-6 py-4">
                Laptop
              </td>
              <td class="px-6 py-4">
                $2999
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600  hover:underline">Edit</a>
              </td>
            </tr>
            <tr class="bg-white border-b   hover:bg-gray-50 ">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">
                White
              </td>
              <td class="px-6 py-4">
                Laptop PC
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">
                Black
              </td>
              <td class="px-6 py-4">
                Accessories
              </td>
              <td class="px-6 py-4">
                $99
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUser
