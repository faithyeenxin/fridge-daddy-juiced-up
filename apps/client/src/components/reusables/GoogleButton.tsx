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
    // Check if google.accounts.id is available
    if (
      typeof google !== 'undefined' &&
      google.accounts &&
      google.accounts.id
    ) {
      const ggl = google.accounts.id.initialize({
        client_id:
          '60536065681-el72it8okrce4mkj2ldg7la7aaqdvcgh.apps.googleusercontent.com',
        callback: handleSignUpWithGoogle,
      });
      const googleRegisterDiv: HTMLElement =
        document.getElementById('registerDiv')!;

      google.accounts.id.renderButton(googleRegisterDiv, {
        type: 'standard',
        text: 'signup_with',
        theme: 'outline',
        size: 'large',
        shape: 'circle',
        width: '256px',
      });
    } else {
      // Handle the case when google is not available
      console.error('Google API is not available.');
    }
  }, []);

  return <div className='flex justify-center' id='registerDiv'></div>;
};

export default GoogleButton;
