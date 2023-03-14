import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { ICategory } from '../../interface';
import { RootState } from '../store';

interface IModalState {
  addModalOpen: boolean;
  addItemModalOpen: boolean;
  addCategoryModalOpen: boolean;
  filterModalOpen: boolean;
}

const initialState: IModalState = {
  addModalOpen: false,
  addItemModalOpen: false,
  addCategoryModalOpen: false,
  filterModalOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setAddModalOpen(state) {
      state.addModalOpen = !state.addModalOpen;
    },
    setAddItemModalOpen(state) {
      state.addItemModalOpen = !state.addItemModalOpen;
    },
    setAddCategoryModalOpen(state) {
      state.addCategoryModalOpen = !state.addCategoryModalOpen;
    },
    setFilterModalOpen(state) {
      state.filterModalOpen = !state.filterModalOpen;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setAddModalOpen,
  setAddItemModalOpen,
  setAddCategoryModalOpen,
  setFilterModalOpen,
} = modalSlice.actions;
export const showAddIsOpen = (state: RootState) => state.modal.addModalOpen;
export const showAddItemIsOpen = (state: RootState) =>
  state.modal.addItemModalOpen;
export const showAddCategoryIsOpen = (state: RootState) =>
  state.modal.addCategoryModalOpen;
export const showFilterIsOpen = (state: RootState) =>
  state.modal.filterModalOpen;

export default modalSlice.reducer;
