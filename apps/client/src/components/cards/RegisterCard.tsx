import React, { MouseEvent, useState, useEffect } from "react";
import {
  authenticateGoogleUser,
  createUser,
  getUserByEmail,
  resetUser,
} from "../../app/slices/userSlice";
import { useAppDispatch } from "../../app/store";
import jwt_decode from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { resetItems } from "../../app/slices/itemsSlice";
import { resetCategories } from "../../app/slices/categoriesSlice";

export const RegisterCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [emailExist, setEmailExist] = useState(false);

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   dateJoined: new Date(),
  // });

  const handleSignUpWithGoogle = (response: any) => {
    dispatch(resetUser());
    dispatch(resetItems());
    dispatch(resetCategories());
    dispatch(authenticateGoogleUser(jwt_decode(response.credential)))
      .unwrap()
      .then((originalPromiseResult: any) => {
        sessionStorage.setItem("fridgeDaddyToken", originalPromiseResult.token);
        navigate(`/home`);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        console.log(rejectedValueOrSerializedError);
      });
  };

  // const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.log("register form has been submitted");
  //   console.log(user);
  //   dispatch(createUser(user));
  //   setUser({
  //     name: "",
  //     email: "",
  //     password: "",
  //     dateJoined: new Date(),
  //   });
  // };

  useEffect(() => {
    //global google
    google.accounts.id.initialize({
      client_id:
        "60536065681-el72it8okrce4mkj2ldg7la7aaqdvcgh.apps.googleusercontent.com",
      callback: handleSignUpWithGoogle,
    });
    const googleRegisterDiv: HTMLElement =
      document.getElementById("registerDiv")!;
    google.accounts.id.renderButton(googleRegisterDiv, {
      type: "standard",
      text: "signup_with",
      theme: "outline",
      size: "large",
      shape: "circle",
      width: "256",
    });
  }, []);

  // google.accounts.id.prompt();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .test("value-email", "User already exist", (email: any): boolean => {
          dispatch(getUserByEmail(email))
            .unwrap()
            .then((originalPromiseResult: any) => {
              // handle result here
              setEmailExist(originalPromiseResult.length);
            })
            .catch((rejectedValueOrSerializedError) => {
              // handle error here
              console.log(rejectedValueOrSerializedError);
            });
          return Boolean(!emailExist);
        }),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
    }),
    onSubmit: (values: any) => {
      dispatch(resetUser());
      dispatch(resetItems());
      dispatch(resetCategories());
      dispatch(createUser(values))
        .unwrap()
        .then((originalPromiseResult: any) => {
          console.log("user was created");
          sessionStorage.setItem(
            "fridgeDaddyToken",
            originalPromiseResult.token
          );
          navigate(`/home`);
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          console.log(rejectedValueOrSerializedError);
        });
    },
  });
  return (
    <div className="bg-grey-lighter flex flex-col">
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center ">
        <div className="bg-white px-6 py-8 rounded-lg shadow-md text-black w-full ">
          <h1 className="mb-8 text-3xl text-center font-bold text-orange">
            Register
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded"
              name="name"
              placeholder="Name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              autoComplete="off"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="px-2 text-orange italic text-sm">
                {formik.errors.name}
              </div>
            ) : null}
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mt-2"
              name="email"
              placeholder="Email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="px-2 text-orange italic text-sm">
                {formik.errors.email}
              </div>
            ) : null}
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mt-2"
              name="password"
              placeholder="Password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="px-2 text-orange italic text-sm">
                {formik.errors.password}
              </div>
            ) : null}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-64 bg-orange text-center py-3 text-white my-1 rounded-full hover:bg-gradient-to-r from-orange to-pink mt-2"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="flex justify-center" id="registerDiv"></div>

          <div className="text-center text-sm text-grey-dark mt-2">
            Having issues registering? {""}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark hover:text-orangeLight"
              href="mailto:faith.ye@hotmail.com?subject=Hi there! I am having issues regarding FridgeDaddy..."
            >
              Contact our developers here!
            </a>
            {/* {""} and {""}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark "
                href="#"
              >
                Privacy Policy
              </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};
