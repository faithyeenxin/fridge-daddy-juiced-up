import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { } from "../../app/slices/itemsSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

const LoggedInNavBar = () => {
  const dispatch = useAppDispatch();
  const [navStatus, setNavStatus] = useState("");
  const [hamburgMenuStatus, setHamburgMenuStatus] = useState("hidden");
  const navigate = useNavigate();
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
    // <nav className="bg-bgColor py-2.5 pr-5 md:pr-10 sticky w-full z-20 top-0 left-0 p-7">
    <nav className="bg-bgColor py-2.5 md:py-4 sticky w-full z-20 top-0 left-0 p-7">
      {/*Flex container */}
      <div className="flex items-center justify-between sm:mx-5 md:mx-0">
        {/* Logo*/}
        <div className="flex">
          <div
            className="text-3xl font-bold tracking-wider text-orange"
            onClick={() => {
              navigate("/home");
              setNavStatus("");
              setHamburgMenuStatus("hidden");
            }}
          >
            FridgeDaddy
          </div>
        </div>
        {/* Menu Items */}
        <div className="flex space-x-5 md:text-l lg:text-xl tracking-wide items-center align-center justify-between">
          {/* <div className=" text-fontGreen">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-8 md:h-8 md:inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
              <div className="md:inline text-sm">{rottten.length}</div>
            </div>
            <div className="text-sadFace">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-8 md:h-8 md:inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
              <div className="md:inline text-sm">{evergreen.length}</div>
            </div>
            <div className="text-fontGray">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 md:w-7 md:h-7 md:inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <div className="md:inline text-sm">{trashed.length}</div>
            </div> */}

          {/* Hambuger Icon */}
          <button
            id="menu-btn"
            className={`${navStatus} block hamburger focus:outline-none`}
            onClick={navBarClicked}
          >
            <span className="hamburger-top "></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div ref={ref}>
        <div
          id="menu"
          className={`${hamburgMenuStatus} absolute flex flex-col items-center self-end mx-10 py-8 mt-8 space-y-6 font-bold bg-white sm:self-center left-2 right-2 drop-shadow-md bg-opacity-80 rounded-2xl`}
        >
          <div
            className="hover:text-orange pt-2 md:text-2xl tracking-wider"
            onClick={() => {
              navigate(`/add-item`);
              setNavStatus("");
              setHamburgMenuStatus("hidden");
            }}
          >
            Add Item
          </div>
          <div
            className="hover:text-orange pt-2 md:text-2xl tracking-wider"
            onClick={() => {
              navigate(`/add-category`);
              setNavStatus("");
              setHamburgMenuStatus("hidden");
            }}
          >
            Category
          </div>
          <div
            className="hover:text-orange pt-2 md:text-2xl tracking-wider"
            onClick={() => {
              navigate(`/recipes`);
              setNavStatus("");
              setHamburgMenuStatus("hidden");
            }}
          >
            Recipes
          </div>
          <div
            className="hover:text-orange pt-2 md:text-2xl tracking-wider"
            onClick={() => {
              navigate(`/account`);
              setNavStatus("");
              setHamburgMenuStatus("hidden");
            }}
          >
            Account
          </div>
          <div
            className="md:block p-2 px-6 pt-2 text-white bg-orange rounded-full baseline hover:bg-orangeLight md:text-2xl"
            onClick={() => {
              sessionStorage.removeItem("fridgeDaddyToken");
              navigate(`/`);
              setNavStatus("");
              setHamburgMenuStatus("hidden");
            }}
          >
            Log Out
          </div>
        </div>
      </div>
    </nav>

  );
};

export default LoggedInNavBar;
