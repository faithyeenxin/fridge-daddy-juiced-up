import React, { Fragment, MouseEvent, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useAppDispatch } from '../../../app/store';
import { useNavigate } from 'react-router-dom';
import {
  authenticateGoogleUser,
  authenticateUser,
  getUserByEmail,
  resetUser,
} from '../../../app/slices/userSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react';
import { resetItems } from '../../../app/slices/itemsSlice';
import { resetCategories } from '../../../app/slices/categoriesSlice';
import { toast } from 'react-toastify';
import GoogleButton from '../GoogleButton';

const LoginCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const [useTestUser, setUseTestUser] = useState({
    email: '',
    password: '',
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: useTestUser.email,
      password: useTestUser.password,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        )
        .required('Password is required'),
    }),
    onSubmit: (values: any) => {
      dispatch(resetUser());
      dispatch(resetItems());
      dispatch(resetCategories());
      dispatch(authenticateUser(values))
        .unwrap()
        .then((originalPromiseResult: any) => {
          // handle result here
          sessionStorage.setItem(
            'fridgeDaddyToken',
            originalPromiseResult.token
          );
          navigate(`/home`);
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          toast.error('Login failed, please try again.');
          openModal();
        });
    },
  });

  return (
    <>
      <div className='bg-grey-lighter flex flex-col'>
        <div className='container max-w-md mx-auto flex-1 flex flex-col items-center justify-center'>
          <div className='bg-white px-6 py-8 rounded-lg shadow-md text-black w-full'>
            <h1
              className='mb-8 text-3xl text-center font-normal text-orange'
              data-testid='login-card-heading'
            >
              Log In to FridgeDaddy!
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <input
                type='text'
                className='block border border-grey-light w-full p-3 rounded'
                data-testid='login-card-field-email'
                name='email'
                placeholder='Email'
                id='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                autoComplete='off'
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  className='px-2 text-orange italic text-sm'
                  data-testid='login-card-field-error-email'
                >
                  {String(formik.errors.email)}
                </div>
              ) : null}
              <input
                type='password'
                className='block border border-grey-light w-full p-3 rounded mt-2'
                data-testid='login-card-field-password'
                name='password'
                autoComplete='current-password'
                placeholder='Password'
                id='password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  className='px-2 text-orange italic text-sm'
                  data-testid='login-card-field-error-password'
                >
                  {String(formik.errors.password)}
                </div>
              ) : null}
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='w-64 bg-orange text-center py-3 mt-4 text-white my-1 rounded-full hover:bg-gradient-to-r from-orange to-pink'
                  data-testid='login-account-button'
                >
                  Let's Go!
                </button>
              </div>
            </form>

            <GoogleButton />

            <div
              className='text-center text-sm text-orangeLight my-2 animate-pulse'
              data-testid='trial-account-container'
            >
              Try us out using our {''}
              <a
                className='no-underline border-b border-grey-dark font-normal text-orange hover:text-green-500 cursor-pointer'
                data-testid='trial-anchor-tag'
                onClick={() =>
                  setUseTestUser({
                    email: 'testUser@hotmail.com',
                    password: 'Password123!',
                  })
                }
              >
                Trial Account
              </a>
              {/* {""} and {""}
              <a
                className="no-underline border-b border-grey-dark text-grey-dark "
                href="#"
              >
                Privacy Policy
              </a> */}
            </div>
            <div
              className='text-center text-xs text-grey-dark'
              data-testid='contact-developer-container'
            >
              Having issues logging in? {''}
              <a
                className='no-underline border-b border-grey-dark text-grey-dark hover:text-orangeLight'
                data-testid='contact-dev-anchor-tag'
                href='mailto:faith.ye@hotmail.com?subject=Hi there! I am having issues regarding FridgeDaddy...'
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={closeModal}
          data-testid='error-modal'
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='flex text-lg font-medium leading-6 text-red-400'
                    data-testid='error-modal-item'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 text-red-400 mr-2'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
                      />
                    </svg>
                    Login Unsuccessful
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p
                      className='text-sm text-gray-500'
                      data-testid='error-modal-item'
                    >
                      You must have entered the wrong email or password. <br />{' '}
                      Please try again!
                    </p>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='button'
                      className='mr-2 inline-flex justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gradient-to-r from-orange to-pink focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                      data-testid='try-again-button'
                    >
                      Try Again!
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-buttonBrightGreen px-4 py-2 text-sm font-medium text-fontGreen hover:bg-buttonLightGreen focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => navigate('/register')}
                      data-testid='register-button'
                    >
                      Register with Us!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginCard;
