import React from 'react';
import { RegisterCard } from '../components/reusables/cards/RegisterCard';
import register2 from '../assets/img/register2.png';
import signup from '../assets/img/verification/sign-up.png';
const Register = () => {
  return (
    <div className=' h-screen'>
      <div className='container flex flex-col items-center mx-auto space-y-0 md:flex-row h-full md:h-screen px-3 pt-5 md:pt-0'>
        {/* Left Item */}
        <div className='md:w-1/2 pb-5 pt-10 md:pt-0'>
          <RegisterCard />
        </div>
        {/* Right Item */}
        <div className='md:w-1/2 items-center hidden md:flex justify-center'>
          <img src={signup} />
        </div>
      </div>
    </div>
  );
};

export default Register;
