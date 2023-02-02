import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllCategories,
  getCategory,
} from "../../app/slices/categoriesSlice";
import { getItemsByUserId } from "../../app/slices/itemsSlice";
import { allData, setToken, setUser } from "../../app/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/store";

/*
const tokenData = {
  id: "2d2051ed-d161-417b-a3be-018bcfb7793b",
  password: "$2b$10$rG8esC9ok5sqsT.oBCTPnO15gTpf1UevEUuIlP.MFZPTeOtmM291e",
  name: "Faith Ye",
  image:
    "https: //lh3.googleusercontent.com/a/AEdFTp5vou5vN8VU6lccAA1RS3ChvVKx-r1pr-_qY1Up=s96-c",
  email: "faith.ye94@gmail.com",
  dateJoined: "2022-12-30T08:03:20.867Z",
  iat: 1672416960,
  exp: 1672418760,
};

*/
const fetchAllData = (token: any) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(allData);
  useEffect(() => {
    dispatch(setToken(token));
    dispatch(setUser(token));
    dispatch(getItemsByUserId(token.id));
    dispatch(fetchAllCategories());
  }, [dispatch]);
  return state;
};

export default fetchAllData;
