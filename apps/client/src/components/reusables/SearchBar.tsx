import React, { useState } from 'react';
import {
  setFilterToLoading,
  showFilteredItems,
  showUserItems,
  updateFilteredItems,
  getItemsByUserId,
} from '../../app/slices/itemsSlice';
import { getUserId } from '../../app/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { capitalizeSpecificObjKey } from '../utility/functions/capitalizeSpecificObjKey';
import { lowercaseSpecificObjKey } from '../utility/functions/lowercaseSpecificObjKey';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const token: any = useAppSelector(getUserId);
  const filteredItems = useAppSelector(showFilteredItems);
  const allUserItems = useAppSelector(showUserItems);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    if (e.target.value === '') {
      dispatch(getItemsByUserId(token.id));
    } else {
      let lowercasedFilteredItems = lowercaseSpecificObjKey(
        allUserItems,
        'name'
      );
      let result = lowercasedFilteredItems.filter((item) =>
        item.name.includes(searchValue.toLowerCase())
      );
      dispatch(updateFilteredItems(capitalizeSpecificObjKey(result, 'name')));
      // setSearchValue('');
    }
  };

  const updateSearchBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    dispatch(setFilterToLoading());
    const newTimeoutId = setTimeout(() => {
      handleSearch(e);
    }, 300);
    setTimeoutId(newTimeoutId);
  };
  return (
    // <div className="flex gap-2">
    <form>
      <input
        type='text'
        placeholder='Looking for something?'
        value={searchValue}
        className='w-full p-2 rounded-3xl text-md xl:text-lg text-white opacity-80 placeholder-white bg-mutedPink placeholder:font-bold font-lato px-5 py-2 focus:outline-none'
        onChange={(e) => {
          setSearchValue(e.target.value);
          updateSearchBox(e);
        }}
      />
      {/* <button
                className="w-2/12 bg-orange text-gray-500 p-2 rounded-3xl font-bold font-lato text-lg hover:bg-gradient-to-r from-orange to-pink"
                type="submit"
            >
                Search
            </button> */}
    </form>
    // </div>
  );
};

export default SearchBar;
