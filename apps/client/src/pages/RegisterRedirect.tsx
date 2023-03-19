import React, { FC } from 'react';

const RegisterRedirect: FC = () => {
  return (
    <div className='h-[80vh] flex flex-col gap-5 justify-center items-center text-orange text-md md:text-xl font-lora'>
      <div className='text-center'>
        You do not have an account with FridgeDaddy
      </div>
      <div className='text-center'>
        Join the family by clicking Get Started button on the top right of this
        website!
      </div>
    </div>
  );
};

export default RegisterRedirect;
