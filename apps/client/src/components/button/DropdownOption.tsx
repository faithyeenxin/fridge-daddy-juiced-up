import React from 'react';
import { useAppDispatch } from '../../app/store';
import { ICategory } from '../../interface';
import { capitalizeWords } from '../utility/functions/capitalizeWord';
import { format, min, max, add } from 'date-fns';
import { resetShelfLife, setShelfLife } from '../../app/slices/categoriesSlice';

const DropdownOption = ({
  dropdownName,
  item,
  openDropdown,
  setOpenDropdown,
  setSelectedValue,
  newItem,
  setNewItem,
  setDaysInFocus,
  purchaseDate,
  setExpiryDate,
}: any) => {
  const dispatch = useAppDispatch();

  return (
    <li key={item.id}>
      <div
        className='flex items-center rounded-2xl pl-2 text-orange font-lora hover:bg-white hover:cursor-pointer'
        id={`${item.id}-dropdown-option`}
        onClick={(e) => {
          console.log(`option clicked ${item.id}`);
          setOpenDropdown(!openDropdown);
          console.log(`${item} has been clicked`);
          setSelectedValue(item);
          if (dropdownName === 'Category') {
            setNewItem({ ...newItem, categoryId: item.id });
            if (item.name !== '-') {
              dispatch(setShelfLife(item));
            } else {
              dispatch(resetShelfLife());
            }
          }
          if (dropdownName === 'Compartment') {
            setNewItem({ ...newItem, storedIn: item.name.split(' ')[0] });
            setDaysInFocus(item.days);
            console.log(item.days);
            let newExpiryDate = new Date();
            newExpiryDate.setDate(new Date(purchaseDate).getDate() + item.days);
            console.log(newExpiryDate);
            setExpiryDate(format(newExpiryDate, 'yyyy-MM-dd'));
          }
        }}
      >
        {capitalizeWords(item.name)}
      </div>
    </li>
  );
};

export default DropdownOption;
