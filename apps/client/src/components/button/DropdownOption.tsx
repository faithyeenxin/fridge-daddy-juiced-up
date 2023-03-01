import React from 'react';
import { useAppDispatch } from '../../app/store';
import { ICategory } from '../../interface';
import { capitalizeWords } from '../utility/functions/capitalizeWord';

const DropdownOption = ({
  dropdownName,
  item,
  openDropdown,
  setOpenDropdown,
  handleSelectedValue,
}: any) => {
  return (
    <li key={item.id}>
      <div
        className='flex items-center rounded-2xl pl-2 text-orange font-lora hover:bg-white hover:cursor-pointer'
        id={`${item.id}`}
        onClick={() => {
          setOpenDropdown(!openDropdown);
          handleSelectedValue(dropdownName, item);
        }}
      >
        {capitalizeWords(item.name)}
      </div>
    </li>
  );
};

export default DropdownOption;
