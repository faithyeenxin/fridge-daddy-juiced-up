import React, { useEffect } from 'react';
import { resetCategories } from '../../app/slices/categoriesSlice';
import { resetItems } from '../../app/slices/itemsSlice';
import { authenticateGoogleUser, resetUser } from '../../app/slices/userSlice';
import { useAppDispatch } from '../../app/store';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignUpWithGoogle = (response: any) => {
    dispatch(resetUser());
    dispatch(resetItems());
    dispatch(resetCategories());
    dispatch(authenticateGoogleUser(jwt_decode(response.credential)))
      .unwrap()
      .then((originalPromiseResult: any) => {
        sessionStorage.setItem('fridgeDaddyToken', originalPromiseResult.token);
        navigate(`/home`);
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        toast.error(rejectedValueOrSerializedError);
      });
  };

  useEffect(() => {
    //global google
    const ggl = google.accounts.id.initialize({
      client_id:
        '60536065681-el72it8okrce4mkj2ldg7la7aaqdvcgh.apps.googleusercontent.com',
      callback: handleSignUpWithGoogle,
    });
    const googleRegisterDiv: HTMLElement =
      document.getElementById('registerDiv')!;

    try {
      google.accounts.id.renderButton(googleRegisterDiv, {
        type: 'standard',
        text: 'signup_with',
        theme: 'outline',
        size: 'large',
        shape: 'circle',
        width: '256px',
      });
    } catch {
      console.log('failed');
    }
  }, []);
  // google.accounts.id.prompt();
  return <div className='flex justify-center' id='registerDiv'></div>;
};

export default GoogleButton;
