import { useState } from "react";
import { showUser } from "../app/slices/userSlice";
import { useAppSelector } from "../app/store";
import ChangePassword from "../components/account/ChangePassword";
import ChangeProfilePicture from "../components/account/ChangeProfilePicture";

const Account = () => {
  const user = useAppSelector(showUser);

  const [showChangeProfilePicComponent, setShowChangeProfilePicComponent] =
    useState(false);
  const [showChangePasswordComponent, setChangePasswordComponent] =
    useState(false);

  const changeProfilePhoto = () => {
    console.log("profiled photo changed");
  };

  const changePassword = () => {
    console.log("password changed");
  };

  const clearTrash = () => {
    console.log("trash cleared");
  };

  return (
    <div>
      <div className="flex mt-6 md:mt-10 mx-auto">
        <div className="w-4/5 md:w-2/3 mx-auto p-10 bg-bgColor rounded-2xl">
          <div className="flex justify-center items-center gap-3 md:gap-10 ">
            {/* <div className="flex md:w-1/3 justify-center"> */}
            <img
              className="w-1/3 h-1/3 md:w-40 md:h-40 rounded-full"
              src={user.image}
            />
            {/* </div> */}
            <div className="space-y-1 md:w-2/3">
              <h1 className="text-md md:text-3xl font-roboto tracking-wider">
                Hello, {user.name}
              </h1>
              <h1 className="text-sm md:text-lg italic text-gray-500">
                {user.email}
              </h1>
              <div className="hidden md:block justify-center">
                <button
                  onClick={() => {
                    setChangePasswordComponent(false);
                    setShowChangeProfilePicComponent(
                      !showChangeProfilePicComponent
                    );
                  }}
                  className="mr-5 disabled:opacity-40 text-white bg-gradient-to-br from-blue-500 disabled:cursor-not-allowed to-green-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-xs px-2 py-2 md:px-5 md:py-2.5 text-center m-auto"
                >
                  Change Profile Photo
                </button>
                <button
                  onClick={() => {
                    setShowChangeProfilePicComponent(false);
                    setChangePasswordComponent(!showChangePasswordComponent);
                  }}
                  className="mr-5  disabled:opacity-40 text-white bg-gradient-to-br from-red-500 disabled:cursor-not-allowed to-pink-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-xs px-2 py-2 md:px-5 md:py-2.5 text-center m-auto"
                >
                  Change Password
                </button>
                <button
                  onClick={clearTrash}
                  className="disabled:opacity-40 text-white bg-gradient-to-br from-gray-500 disabled:cursor-not-allowed to-purple-400 hover:bg-gradient-to-bl  font-medium rounded-lg text-xs px-2 py-2 md:px-5 md:py-2.5 text-center m-auto"
                >
                  Clear Trash
                </button>
              </div>
            </div>
          </div>
          <div className="block md:hidden my-10 space-y-2">
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setChangePasswordComponent(false);
                  setShowChangeProfilePicComponent(
                    !showChangeProfilePicComponent
                  );
                }}
                className="disabled:opacity-40 text-white bg-gradient-to-br from-blue-500 disabled:cursor-not-allowed to-green-400 hover:bg-gradient-to-bl font-medium rounded-lg text-xs px-2 py-2 w-52 text-center"
              >
                Change Profile Photo
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowChangeProfilePicComponent(false);
                  setChangePasswordComponent(!showChangePasswordComponent);
                }}
                className="disabled:opacity-40 text-white bg-gradient-to-br from-red-500 disabled:cursor-not-allowed to-pink-400 hover:bg-gradient-to-bl font-medium rounded-lg text-xs px-2 py-2 w-52 text-center"
              >
                Change Password
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={clearTrash}
                className="disabled:opacity-40 text-white bg-gradient-to-br from-gray-500 disabled:cursor-not-allowed to-purple-400 hover:bg-gradient-to-bl font-medium rounded-lg text-xs px-2 py-2 w-52 text-center"
              >
                Clear Trash
              </button>{" "}
            </div>
          </div>
          {/* <button className="mr-2 disabled:opacity-40 text-white bg-gradient-to-br from-blue-500 disabled:cursor-not-allowed to-green-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-2 py-2 md:px-5 md:py-2.5 text-center m-auto">
            Change Profile Photo
          </button>
          <button className="mr-2 disabled:opacity-40 text-white bg-gradient-to-br from-red-500 disabled:cursor-not-allowed to-pink-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-2 py-2 md:px-5 md:py-2.5 text-center m-auto">
            Change Password
          </button>
          <button className="disabled:opacity-40 text-white bg-gradient-to-br from-gray-500 disabled:cursor-not-allowed to-purple-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-xs px-2 py-2 md:px-5 md:py-2.5 text-center m-auto">
            Clear Trash
          </button> */}
        </div>
      </div>
      <div
        className={`flex justify-center mx-auto mt-5 md:mt-10 ${showChangeProfilePicComponent ? "" : "hidden"
          }`}
      >
        <ChangeProfilePicture />
      </div>
      <div
        className={`flex justify-center mx-auto mt-5 md:mt-10 ${showChangePasswordComponent ? "" : "hidden"
          }`}
      >
        <ChangePassword />
      </div>
    </div>
  );
};

export default Account;
