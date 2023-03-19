import React, { FC } from 'react';

const LoginRedirect: FC = () => {
  return (
    <div className='w-[100vw] h-[80vh] flex flex-col gap-5 justify-center items-center text-orange text-xl font-lora'>
      <div>You have been idle for too long.</div>
      <div>Please sign in again!</div>
    </div>
  );
};

export default LoginRedirect;
