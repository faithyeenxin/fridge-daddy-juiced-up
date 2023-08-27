import React from 'react';
import password from '../../assets/img/password.png';
const ChangePassword = () => {
  return (
    <div className='flex flex-wrap-reverse bg-bgColor w-4/5 md:w-2/3 m-auto justify-center md:justify-between rounded-2xl py-5 md:p-10 mb-10'>
      <div className='flex flex-wrap-reverse md:flex-nowrap w-full justify-center'>
        <div className='flex justify-center items-center w-2/3'>
          {/* <input type="file" /> */}
          <div className='flex w-full justify-center flex-wrap gap-2 mt-3'>
            {/* <input
              type="password"
              className="
              w-1/2
        text-lg
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              placeholder="Enter Password"
            /> */}
            <div className='flex w-full md:w-3/4 '>
              <input
                type='text'
                id='default-input'
                placeholder='Current Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div className='flex w-full md:w-3/4'>
              <input
                type='text'
                id='default-input'
                placeholder='New Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              />
            </div>
            <div className='flex w-full md:w-3/4'>
              <input
                type='text'
                id='default-input'
                placeholder='Re-enter New Password'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              ></input>
            </div>
            <div className='flex md:w-3/4'>
              <button className='w-full disabled:opacity-40 text-gray-500 bg-gradient-to-br from-red-500 disabled:cursor-not-allowed to-pink-400  hover:bg-gradient-to-bl font-medium rounded-lg text-xs px-3 py-2 md:py-3 text-center'>
                Change Password
              </button>
            </div>
          </div>
        </div>
        <img src={password} className='w-2/3 md:w-1/4' />
      </div>
    </div>
  );
};

export default ChangePassword;
