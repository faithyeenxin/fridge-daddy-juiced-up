import React, { useEffect, useState } from 'react';
import { showSelectedItems } from '../../app/slices/recipesSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import DropdownSelect from '../reusables/dropdown/DropdownSelect';

const RecipesItemCard = () => {
  const [cuisineSelected, setCuisineSelected] = useState();
  const [mealSelected, setMealSelected] = useState();
  const selectedItems = useAppSelector(showSelectedItems);
  const [selectedItemsName, setSelectedItemsName] = useState<string[]>();

  useEffect(() => {
    if (selectedItems.length > 0) {
      const itemsName = selectedItems.map((item) => item.name.toLowerCase());
      setSelectedItemsName(itemsName);
    }
  }, [selectedItems]);

  return (
    <div className='h-full bg-offWhite rounded-lg flex justify-center p-5'>
      <div
        id='recipeSearchBox'
        className='w-full h-auto py-5 bg-offWhite flex flex-col justify-between gap-5'
      >
        <div className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-widest text-center'>
          Items you've selected
        </div>
        <div className='text-md xl:text-md tracking-wider italic text-blueGray opacity-50 text-center'>
          {/* {you have not selected any items yet} */}
          {selectedItems.length > 0
            ? selectedItemsName?.join(',')
            : 'you have not selected any items yet'}
        </div>

        <div id='buttonsContainer' className='flex gap-1'>
          <div className='w-full flex flex-col xl:flex-row gap-2'>
            <div className='w-full xl:w-1/2'>
              <DropdownSelect
                name='Cuisine'
                setCuisineSelected={setCuisineSelected}
              />
            </div>
            <div className='w-full xl:w-1/2'>
              <DropdownSelect name='Meal' setMealSelected={setMealSelected} />
            </div>
          </div>
          <div className='w-1/5 flex justify-center'>
            <img src='images/recipes/search_button.svg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesItemCard;
