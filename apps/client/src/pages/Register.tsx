import React from 'react';
import { RegisterCard } from '../components/reusables/cards/RegisterCard';
import register2 from '../assets/img/register2.png';
const Register = () => {
  return (
    <div className='bg-bgColor h-screen'>
      <div className='container flex flex-col items-center mx-auto space-y-0 md:flex-row h-full md:h-screen px-3 pt-5 md:pt-0'>
        {/* Left Item */}
        <div className='md:w-1/2 pb-5 pt-10 md:pt-0'>
          <RegisterCard />
        </div>
        {/* Right Item */}
        <div className='md:w-1/2 items-center hidden md:block'>
          <img src={register2} />
        </div>
      </div>
    </div>
  );
};

export default Register;
