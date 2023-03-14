import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './slices/userSlice';
import itemsReducer from './slices/itemsSlice';
import categoriesReducer from './slices/categoriesSlice';
import recipesReducer from './slices/recipesSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  // you can add all the different slices you have here!
  reducer: {
    users: userReducer,
    items: itemsReducer,
    category: categoriesReducer,
    recipes: recipesReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
