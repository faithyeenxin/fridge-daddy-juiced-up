import React, { useEffect, useRef, useState } from 'react';
import { getUserId } from '../../app/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { ICategory } from '../../interface';
import { capitalizeWords } from '../utility/functions/capitalizeWord';
import DropdownOption from './DropdownOption';
import { format, min, max, add } from 'date-fns';
import {
  filterCategories,
  getShelfLife,
  resetShelfLife,
  setShelfLife,
  showCategories,
  showFilteredCategories,
} from '../../app/slices/categoriesSlice';
import { toast } from 'react-toastify';
import { sortedIndex } from 'lodash';
interface IShelfLife {
  id: number;
  name: string;
  days: number;
}
interface IDropdownProps {
  name: string;
  purchaseDate: any;
  setExpiryDate: any;
  setDaysInFocus: any;
  newItem: any;
  setNewItem: any;
  resetState: any;
}

const DropdownSelect = ({
  name,
  purchaseDate,
  setExpiryDate,
  setDaysInFocus,
  newItem,
  setNewItem,
  resetState,
}: IDropdownProps) => {
  const divRef: any = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IShelfLife | ICategory>();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(showCategories);
  const filteredCategories = useAppSelector(showFilteredCategories);
  const shelfLife = useAppSelector(getShelfLife);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(filterCategories(searchValue));
  }, [searchValue]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        // Clicked outside the div, so hide it
        // dispatch(filterCategories(''));
        setOpenDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(undefined);
  }, [resetState]);

  const handleSelectedValue = (dropdownName: string, item: any) => {
    setOpenDropdown(!openDropdown);
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
  };

  const [itemsToRender, setItemsToRender] = useState<
    ICategory[] | IShelfLife[]
  >();

  useEffect(() => {
    if (name === 'Category' && filteredCategories.length > 0) {
      setItemsToRender(filteredCategories);
    } else if (name === 'Category' && filteredCategories.length <= 0) {
      setItemsToRender(categories);
    } else if (name !== 'Compartment') {
      setItemsToRender(categories);
    } else {
      setItemsToRender(shelfLife);
    }
  }, [categories, filteredCategories, shelfLife]);

  return (
    <div className='w-full' ref={divRef}>
      <button
        id='dropdownSearchButton'
        onClick={() => setOpenDropdown(!openDropdown)}
        className='relative items-center text-center justify-center inline-flex w-full h-[30px] xl:h-[40px]  p-2 rounded-3xl bg-opacity-60 text-md tracking-wide text-white disabled:text-gray-100 placeholder-white bg-mutedPink placeholder:font-bold font-lora focus:bg-opacity-80 focus:outline-none'
        data-value={selectedValue?.id}
      >
        {selectedValue ? capitalizeWords(selectedValue?.name) : name}
        <img src='/images/cards/dropdown.svg' className='absolute right-7' />
      </button>
      {/* <!-- Dropdown menu --> */}
      <div className='relative w-full'>
        <div
          id={`dropdownSearch`}
          className={`z-10 ${
            openDropdown ? '' : 'hidden'
          } rounded-lg shadow absolute bg-extraMutedPink mt-2 inset-0 ${
            name === 'Compartment' ? 'h-[100px]' : 'h-[220px]'
          }`}
        >
          {name !== 'Compartment' && (
            <div className='p-3'>
              <label htmlFor='input-group-search' className='sr-only'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-5 h-5 text-mutedPink'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </div>
                <input
                  type='text'
                  id='input-group-search'
                  autoComplete='off'
                  className='block w-full p-1 pl-10 text-md text-mutedPink border border-gray-300 rounded-3xl bg-white placeholder:text-mutedPink placeholder:font-bold font-lora focus:outline-none'
                  placeholder={`Search ${name}`}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>
          )}
          <ul
            className={`h-36 px-3 ${
              name === 'Category' ? 'pb-3' : 'py-3'
            } overflow-y-auto text-md text-white`}
            aria-labelledby='dropdownSearchButton'
          >
            {itemsToRender?.map((item, idx) => (
              <li
                key={item.id}
                className='flex items-center rounded-2xl pl-2 text-orange font-lora hover:bg-white hover:cursor-pointer'
                onClick={() => {
                  handleSelectedValue(name, item);
                }}
              >
                {capitalizeWords(item.name)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropdownSelect;
