import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const [navStatus, setNavStatus] = useState("");
  const [hamburgMenuStatus, setHamburgMenuStatus] = useState("hidden");
  const navigate = useNavigate();
  const learnMoreRef = useRef<HTMLAnchorElement>(null);
  const creatorsRef = useRef<HTMLAnchorElement>(null);
  const signInRef = useRef<HTMLAnchorElement>(null);
  const getStartedRef = useRef<HTMLAnchorElement>(null);
  let ref = useRef<any>();
  useEffect(() => {
    const handler = (event: any) => {
      if (
        navStatus === "open" &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        console.log(ref.current);
        console.log(event.target);
        console.log(ref.current.contains(event.target));

        setNavStatus("");
        setHamburgMenuStatus("hidden");
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [navStatus]);

  const navBarClicked = () => {
    if (navStatus !== "open") {
      setNavStatus("open");
      setHamburgMenuStatus("");
    } else {
      setNavStatus("");
      setHamburgMenuStatus("hidden");
    }
  };

  return (
    <>
      {/* NavBar */}
      {/* <nav className="sticky top-0 z-50 container mx-auto font-lora p-6 "> */}
      <nav className="bg-bgPink py-2.5 sticky w-full z-20 top-0 left-0 p-4">
        {/*Flex container */}
        <div className="flex items-center justify-between sm:mx-5 md:mx-0">
          {/* Logo*/}
          <div className="flex">
            {/* <img src={hammieBurg} alt="fridge daddy icon" /> */}
            <a
              className="text-3xl font-bold tracking-wider text-fontOrange m-3"
              onClick={() => {
                navigate("/");
              }}
            >
              FridgeDaddy
            </a>
          </div>
          {/* Menu Items */}
          <div className="hidden md:flex space-x-6 pt-2  md:text-l lg:text-xl tracking-wide ">
            {/* <a
              className="hover:text-fontOrange pt-2"
              onClick={() => navigate("/learn-more")}
            >
              Learn More
            </a> */}
            <div
              className="hover:text-fontOrange pt-2"
              onClick={() => {
                navigate("/creators");
              }}
            >
              the Creator
            </div>
            <div
              className="hover:text-fontOrange pt-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </div>
            <div
              className="hidden md:block p-2 px-6 pt-2 text-white bg-fontOrange rounded-full baseline hover:bg-fontOrangeLight text-md "
              onClick={() => {
                navigate("/register");
              }}
            >
              Get Started
            </div>
          </div>

          {/* Hambuger Icon */}

          <button
            id="menu-btn"
            className={`${navStatus} block hamburger md:hidden focus:outline-none`}
            onClick={navBarClicked}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden" ref={ref}>
          <div
            id="menu"
            className={`${hamburgMenuStatus} absolute flex flex-col items-center self-end  mx-10 py-8 mt-1 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-5 right-5 drop-shadow-md bg-opacity-80 rounded-2xl`}
          >
            {/* <a
              className="hover:text-fontOrange pt-2 tracking-widest"
              href="/learn-more"
            >
              Learn More
            </a> */}
            <a
              className="hover:text-fontOrange pt-2 tracking-widest"
              onClick={() => {
                navigate("/creators");
                setNavStatus("");
                setHamburgMenuStatus("hidden");
              }}
            >
              the Creators
            </a>
            <a
              className="hover:text-fontOrange pt-2 tracking-widest"
              onClick={() => {
                navigate("/login");
                setNavStatus("");
                setHamburgMenuStatus("hidden");
              }}
            >
              Sign In
            </a>
            <a
              className="md:block p-2 px-6 pt-2 text-white bg-fontOrange rounded-full baseline hover:bg-fontOrangeLight text-md"
              onClick={() => {
                navigate("/register");
                setNavStatus("");
                setHamburgMenuStatus("hidden");
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
