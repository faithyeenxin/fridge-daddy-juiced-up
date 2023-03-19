import React, { FC } from 'react';

const LoginRedirect: FC = () => {
  return (
    <div className='h-[80vh] flex flex-col gap-5 justify-center items-center text-orange ∂text-md md:text-xl font-lora'>
      <div className='text-center'>You have been idle for too long.</div>
      <div className='text-center'>Please sign in again!</div>
    </div>
  );
};

export default LoginRedirect;
