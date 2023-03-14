import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import parseJwt from '../utility/parseJwt';
import fetchAllData from './fetchAllData';
import { useAppDispatch } from '../../app/store';
import { resetUser, setToken, setUser } from '../../app/slices/userSlice';
import { getItemsByUserId, resetItems } from '../../app/slices/itemsSlice';
import {
  fetchAllCategories,
  resetCategories,
} from '../../app/slices/categoriesSlice';

interface IPrivateRouteProps {
  outlet: JSX.Element;
}
const PrivateRoute = ({ outlet }: IPrivateRouteProps) => {
  const token: any = sessionStorage.getItem('fridgeDaddyToken');
  const dispatch = useAppDispatch();

  if (token !== null) {
    const payload = parseJwt(token);
    const today = new Date();
    const expiryDate = new Date(payload.exp * 1000);
    const diffInMilliseconds = differenceInMilliseconds(expiryDate, today);
    if (diffInMilliseconds < 0) {
      sessionStorage.removeItem('fridgeDaddyToken');
      dispatch(resetUser());
      dispatch(resetItems());
      dispatch(resetCategories());
      return <Navigate to='/login-redirect' />;
    } else {
      useEffect(() => {
        dispatch(setToken(payload));
        dispatch(setUser(payload));
        dispatch(getItemsByUserId(payload.id));
        dispatch(fetchAllCategories());
      }, [dispatch]);
      return outlet;
    }
  } else {
    dispatch(resetUser());
    dispatch(resetItems());
    dispatch(resetCategories());
    return <Navigate to='/register-redirect' />;
  }
};
export default PrivateRoute;
