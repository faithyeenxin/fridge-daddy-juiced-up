import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const [navStatus, setNavStatus] = useState('');
  const [hamburgMenuStatus, setHamburgMenuStatus] = useState('hidden');
  const navigate = useNavigate();
  let divRef = useRef<any>();

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setNavStatus('');
        setHamburgMenuStatus('hidden');
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const navBarClicked = () => {
    if (navStatus === 'open') {
      setNavStatus('');
      setHamburgMenuStatus('hidden');
    } else {
      setNavStatus('open');
      setHamburgMenuStatus('');
    }
  };

  return (
    <nav className='bg-bgColor py-2.5 md:py-4 sticky w-full z-20 top-0 left-0 p-7'>
      {/*Flex container */}
      <div className='flex items-center justify-between sm:mx-5 md:mx-0'>
        {/* Logo*/}
        <div className='flex'>
          {/* <img src={hammieBurg} alt="fridge daddy icon" /> */}
          <a
            className='text-3xl font-bold tracking-wider text-orange hover:cursor-pointer'
            onClick={() => {
              navigate('/');
            }}
          >
            FridgeDaddy
          </a>
        </div>
        {/* Menu Items */}
        <div className='md:flex space-x-6  md:text-l lg:text-xl tracking-wide items-center'>
          {/* <div
            className='hover:text-orange hidden md:flex hover:cursor-pointer'
            onClick={() => {
              navigate('/learn-more');
            }}
          >
            Learn More
          </div> */}
          <div
            className='hover:text-orange  hidden md:flex hover:cursor-pointer'
            onClick={() => {
              navigate('/login');
            }}
          >
            Sign In
          </div>
          <div
            className='hidden md:block p-1 px-6 text-white bg-orange rounded-full baseline hover:bg-gradient-to-r from-orange to-pink text-md hover:cursor-pointer'
            onClick={() => {
              navigate('/register');
            }}
          >
            Get Started
          </div>

          <div ref={divRef}>
            {/* Hambuger Icon */}
            <button
              ref={divRef}
              id='menu-btn'
              // className={`block hamburger md:hidden focus:outline-none`}
              className={`${navStatus} block hamburger md:hidden focus:outline-none`}
              onClick={navBarClicked}
            >
              <span className='hamburger-top'></span>
              <span className='hamburger-middle'></span>
              <span className='hamburger-bottom'></span>
            </button>

            {/* Mobile Menu */}
            <div className='md:hidden' ref={divRef}>
              <div
                id='menu'
                // className={`${hamburgMenuStatus} absolute flex flex-col items-center self-end  mx-10 py-8 mt-5 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-2 right-2 drop-shadow-md bg-opacity-80 rounded-2xl`}
                className={`${hamburgMenuStatus} absolute flex flex-col items-center self-end mx-[10%] py-8 mt-8 space-y-6 font-bold bg-white sm:self-center left-2 right-2 drop-shadow-md bg-opacity-80 rounded-2xl`}
              >
                {/* <a
              className="hover:text-orange pt-2 tracking-widest"
              href="/learn-more"
            >
              Learn More
            </a> */}
                {/* <a
                  className='hover:text-orange tracking-widest'
                  onClick={() => {
                    navigate('/learn-more');
                    setNavStatus('');
                    setHamburgMenuStatus('hidden');
                  }}
                >
                  Learn More
                </a> */}
                <a
                  className='hover:text-orange tracking-widest'
                  onClick={() => {
                    navigate('/login');
                    setNavStatus('');
                    setHamburgMenuStatus('hidden');
                  }}
                >
                  Sign In
                </a>
                <a
                  className='md:block p-2 px-6 text-white bg-orange rounded-full baseline hover:bg-gradient-to-r from-orange to-pink text-md'
                  onClick={() => {
                    navigate('/register');
                    setNavStatus('');
                    setHamburgMenuStatus('hidden');
                  }}
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
