import { useState } from 'react';
import {
  createUser,
  getUserByEmail,
  resetUser,
} from '../../../app/slices/userSlice';
import { useAppDispatch } from '../../../app/store';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { resetItems } from '../../../app/slices/itemsSlice';
import { resetCategories } from '../../../app/slices/categoriesSlice';
import { toast } from 'react-toastify';
import GoogleButton from '../GoogleButton';

export const RegisterCard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
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
      toast.success("We're registering you!");
      dispatch(resetUser());
      dispatch(resetItems());
      dispatch(resetCategories());
      dispatch(createUser(values))
        .unwrap()
        .then((originalPromiseResult: any) => {
          sessionStorage.setItem(
            'fridgeDaddyToken',
            originalPromiseResult.token
          );
          navigate(`/home`);
        })
        .catch(async (rejectedValueOrSerializedError) => {
          // handle error here
          toast.error(
            'User already exist, please register with another email.'
          );
        });
    },
  });
  return (
    <div className='bg-grey-lighter flex flex-col'>
      <div className='container max-w-md mx-auto flex-1 flex flex-col items-center justify-center '>
        <div className='bg-white px-6 py-8 rounded-lg shadow-md text-black w-full '>
          <h1
            data-testid='register-card-heading'
            className='mb-8 text-3xl text-center font-bold text-orange'
          >
            Register
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              type='text'
              data-testid='register-card-field-name'
              className='block border border-grey-light w-full p-3 rounded'
              name='name'
              placeholder='Name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              autoComplete='off'
            />
            {formik.touched.name && formik.errors.name ? (
              <div
                data-testid='register-card-field-error-name'
                className='px-2 text-orange italic text-sm'
              >
                {formik.errors.name}
              </div>
            ) : null}
            <input
              type='text'
              data-testid='register-card-field-email'
              className='block border border-grey-light w-full p-3 rounded mt-2'
              name='email'
              placeholder='Email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete='off'
            />
            {formik.touched.email && formik.errors.email ? (
              <div
                data-testid='register-card-field-error-email'
                className='px-2 text-orange italic text-sm'
              >
                {formik.errors.email}
              </div>
            ) : null}
            <input
              type='password'
              data-testid='register-card-field-password'
              className='block border border-grey-light w-full p-3 rounded mt-2'
              name='password'
              placeholder='Password'
              autoComplete='current-password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div
                data-testid='register-card-field-error-password'
                className='px-2 text-orange italic text-sm'
              >
                {formik.errors.password}
              </div>
            ) : null}
            <div className='flex justify-center'>
              <button
                type='submit'
                data-testid='create-account-button'
                className='w-64 bg-orange text-center py-3 text-white my-1 rounded-full hover:bg-gradient-to-r from-orange to-pink mt-2'
              >
                Create Account
              </button>
            </div>
          </form>
          <GoogleButton />
          <div className='text-center text-sm text-grey-dark mt-2'>
            Having issues registering? {''}
            <a
              data-testid='register-card-email-link'
              className='no-underline border-b border-grey-dark text-grey-dark hover:text-orangeLight'
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
  );
};
