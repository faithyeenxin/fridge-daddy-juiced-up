import React from 'react';
import LoginCard from '../components/reusables/cards/LoginCard';
// import signin from '../assets/img/sign-in2.png';
import signin from '../assets/img/verification/sign-in.png';

const Login = () => {
  return (
    <div id='login' className='h-screen'>
      <div className='container flex flex-col items-center px-3 mx-auto space-y-0 md:flex-row h-full md:h-screen '>
        {/* Left Item */}
        <div className='flex flex-col items-center md:w-1/2'>
          {/* <h1 className="text-3xl font-normal text-center text-orange animate-bounce md:text-4xl pt-20 md:pt-0">
            Welcome Back!
          </h1> */}
          <div className='hidden md:block'>
            <img src={signin} className='rotate-[360deg]' />
          </div>
        </div>
        {/* Right Item */}
        <div className='md:w-1/2 pb-5 pt-10 md:pt-0'>
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default Login;
