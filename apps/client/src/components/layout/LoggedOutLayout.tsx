import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';

const LoggedOutLayout = () => {
  return (
    <div>
      <NavBar />
      <div className='my-3 mx-7'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LoggedOutLayout;
