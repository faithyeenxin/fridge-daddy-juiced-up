import React from 'react';
import { useAppDispatch } from '../../../app/store';
import { ICategory } from '../../../interface';
import { capitalizeWords } from '../../utility/functions/capitalizeWord';
import { format, min, max, add } from 'date-fns';
import {
  resetShelfLife,
  setShelfLife,
} from '../../../app/slices/categoriesSlice';
import { toast } from 'react-toastify';

const DropdownOption = ({ item, handleSelectedValue }: any) => {
  const dispatch = useAppDispatch();

  return (
    <li
      key={item.id}
      className='flex items-center rounded-2xl pl-2 text-orange font-lato hover:bg-white hover:cursor-pointer'
      onClick={handleSelectedValue}
    >
      {capitalizeWords(item.name)}
    </li>
  );
};

export default DropdownOption;
