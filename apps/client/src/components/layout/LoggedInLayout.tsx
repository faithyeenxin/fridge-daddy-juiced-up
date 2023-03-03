import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import LoggedInNavBar from './LoggedInNavBar';

const LoggedInLayout = () => {
  return (
    <div>
      <LoggedInNavBar />
      <div className='my-3 mx-7'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LoggedInLayout;
