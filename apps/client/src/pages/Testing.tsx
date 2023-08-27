import React from 'react';
import DropdownButton from '../components/reusables/dropdown/DropdownSelect';
import Home from './Home';
const Testing = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-2'>
      <div data-testid='testing-page-heading'>This is my test page.</div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-gray-500 font-normal py-2 px-4 rounded w-[200px]'
        data-testid='testing-page-button'
        onClick={() => {
          alert('test button has been clicked');
        }}
      >
        Random Test Button
      </button>
    </div>
  );
};

export default Testing;
