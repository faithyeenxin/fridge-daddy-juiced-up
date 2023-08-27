import React from 'react';
import profilepic from '../../assets/img/profile_pic.png';
const ChangeProfilePicture = () => {
  const handleOndragOver = (event: any) => {
    event.preventDefault();
  };
  const handleOndrop = (event: any) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    console.log('item dropped');
    // let imageFile = event.dataTransfer.files[0];
  };
  return (
    <div className='flex flex-wrap-reverse bg-bgColor w-4/5 md:w-2/3 m-auto justify-center md:justify-between rounded-2xl p-8 md:p-10 mb-5'>
      <div className='flex flex-wrap-reverse md:flex-nowrap w-full justify-center gap-5'>
        <div className='flex justify-center items-center w-2/3 md:flex-wrap gap-2'>
          <div className='items-center justify-center w-full hidden md:flex '>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100'
            >
              <div
                className='flex flex-col items-center justify-center pt-5 pb-6'
                onDragOver={handleOndragOver}
                onDrop={handleOndrop}
              >
                <svg
                  aria-hidden='true'
                  className='w-10 h-10 mb-3 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  ></path>
                </svg>
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id='dropzone-file' type='file' className='hidden' />
            </label>
          </div>
          <div className='flex md:hidden flex-wrap gap-2 justify-center'>
            <input
              className='block w-52 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-1'
              id='default_size'
              type='file'
            ></input>
            <button className='disabled:opacity-40 text-gray-500 bg-gradient-to-br from-blue-500 disabled:cursor-not-allowed to-green-400 hover:bg-gradient-to-bl font-medium rounded-lg text-xs px-1 py-1.5 w-52 text-center'>
              Submit
            </button>
          </div>
          <div className='hidden md:flex w-full justify-center'>
            <button className=' disabled:opacity-40 text-gray-500 bg-gradient-to-br from-blue-500 disabled:cursor-not-allowed to-green-400 hover:bg-gradient-to-bl font-medium rounded-lg text-lg px-1 py-1.5 w-1/2 text-center'>
              Submit
            </button>
          </div>
        </div>
        <img src={profilepic} className='w-5/6 md:w-1/3 md:h-auto' />
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
