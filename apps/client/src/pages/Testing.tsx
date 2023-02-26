import React from "react";
import DropdownButton from "../components/button/DropdownSelect";
import Home from "./Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Testing = () => {
  const notify = () => toast("Wow so easy !");
  return (
    <>
      <Home />
      {/* <DropdownButton name="Category" /> */}
    </>
  );
};

export default Testing;

//    <div>
//      <button onClick={notify}>Notify !</button>
//  <ToastContainer />
//      <ToastContainer
//        position="bottom-right"
//        autoClose={5000}
//        hideProgressBar={false}
//        newestOnTop={false}
//        closeOnClick
//        rtl={false}
//        pauseOnFocusLoss
//        draggable
//        pauseOnHover
//        theme="light"
//      />
//    </div>;
