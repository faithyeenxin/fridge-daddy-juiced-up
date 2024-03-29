import React, { useState } from 'react';
import {
  createCategory,
  showCategories,
} from '../../../app/slices/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { ICategory } from '../../../interface';
import DropdownButton from '../dropdown/DropdownSelect';
import { capitalizeWords } from '../../utility/functions/capitalizeWord';
import { toast } from 'react-toastify';
import { getUserId } from '../../../app/slices/userSlice';
import {
  setAddCategoryModalOpen,
  setAddModalOpen,
} from '../../../app/slices/modalSlice';

const AddCategoryCard = () => {
  const token: any = useAppSelector(getUserId);
  const dispatch = useAppDispatch();
  const [newCategory, setNewCategory] = useState<ICategory>({
    // userId: '',
    name: '',
    dateCreated: new Date(),
    pantryDays: 0,
    fridgeDays: 0,
    freezerDays: 0,
  });

  const handleSubmit = () => {
    if (
      newCategory.pantryDays < 0 ||
      newCategory.fridgeDays < 0 ||
      newCategory.freezerDays < 0
    ) {
      toast.error('Pantry, Fridge & Freezer Days must be a positive value.');
    } else if (Object.values(newCategory).includes('')) {
      toast.error('All fields have to be filled.');
    } else {
      toast.success("We're adding your category!");
      dispatch(createCategory(newCategory))
        .unwrap()
        .then((originalPromiseResult) => {
          // handle result here
          toast.success('Your category has been added!');
          // dispatch(setAddCategoryModalOpen(false));
        })
        .catch((rejectedValueOrSerializedError) => {
          // handle error here
          toast.error('We could not add your category! Please try again.');
        });
    }
  };

  return (
    <div className='flex items-center justify-evenly flex-col m-5 gap-2'>
      <div
        className='text-2xl xl:text-3xl font-lato font-normal text-orange tracking-wider'
        data-testid='add-category-heading'
      >
        Add a Category
      </div>
      <input
        type='text'
        data-testid='add-category-name-input'
        placeholder='Name'
        // value={newCategory.name}
        className='w-full h-[40px] p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center focus:bg-opacity-80 focus:outline-none'
        onChange={(e) => {
          setNewCategory({ ...newCategory, name: e.target.value });
        }}
      />
      <div className='flex flex-row gap-1'>
        <input
          type='number'
          data-testid='add-category-pantry-input'
          min={0}
          // value={newCategory.pantryDays}
          placeholder='Pantry'
          className='w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-sm tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center justify-center focus:bg-opacity-80 focus:outline-none'
          onChange={(e) => {
            setNewCategory({
              ...newCategory,
              pantryDays: Number(e.target.value),
            });
          }}
        />
        <input
          type='number'
          data-testid='add-category-fridge-input'
          min={0}
          // value={newCategory.fridgeDays}
          placeholder='Fridge'
          className='w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-sm  tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center focus:bg-opacity-80 focus:outline-none'
          onChange={(e) => {
            setNewCategory({
              ...newCategory,
              fridgeDays: Number(e.target.value),
            });
          }}
        />
        <input
          type='number'
          data-testid='add-category-freezer-input'
          min={0}
          // value={newCategory.freezerDays}
          placeholder='Freezer'
          className='w-full h=[40px] p-2 rounded-3xl bg-opacity-60 text-sm tracking-wide text-gray-500 placeholder-gray-500 bg-mutedPink placeholder:font-normal font-lato text-center focus:bg-opacity-80 focus:outline-none'
          onChange={(e) => {
            setNewCategory({
              ...newCategory,
              freezerDays: Number(e.target.value),
            });
          }}
        />
      </div>
      <div
        data-testid='add-category-button'
        className='flex justify-center w-full bg-orange rounded-3xl items-center hover:bg-gradient-to-r from-orange to-pink cursor-pointer'
        onClick={handleSubmit}
      >
        <img src='/images/cards/add.svg' />
      </div>
    </div>
  );
};

export default AddCategoryCard;
