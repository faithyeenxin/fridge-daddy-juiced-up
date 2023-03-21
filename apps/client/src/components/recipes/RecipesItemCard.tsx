import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { showFilteredItems } from '../../app/slices/itemsSlice';
import {
  setCuisineSelected,
  setMealSelected,
  setRecipes,
  setRecipesLoading,
  showSelectedCuisine,
  showSelectedItems,
  showSelectedMeal,
} from '../../app/slices/recipesSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { IItem } from '../../interface';
import DropdownSelect from '../reusables/dropdown/DropdownSelect';

const RecipesItemCard = () => {
  const dispatch = useAppDispatch();
  const filteredItems = useAppSelector(showFilteredItems);
  const cuisineInput = useAppSelector(showSelectedCuisine);
  const mealInput = useAppSelector(showSelectedMeal);
  const numberOfRecipes = 20;
  const apiKey = `5962ec749418426c81fa226be6317343`;
  const apiKey2 = `a15745668f894779b75adf57f9d76136`;
  const apiKey3 = `8e4e45b4d72f4a74b59440190f82116e`;
  const apiKey4 = `fc30ca941c9141489055ff119a8ac01c`;

  const [allSelectedItems, setAllSelectedItems] = useState<string[]>();
  useEffect(() => {
    let selectedItems: string[] = [];
    filteredItems.forEach((item) => {
      if (item.selected) {
        selectedItems.push(item.name.toLowerCase());
      }
    });
    setAllSelectedItems(selectedItems);
  }, [filteredItems]);

  //////////////////////////////////////////////////////
  //// * Searched Recipe
  //////////////////////////////////////////////////////
  const handleSearchRecipe = () => {
    const ingredients = allSelectedItems?.join(',');
    const cuisine = cuisineInput.name;
    const meal = mealInput.name;
    dispatch(setRecipesLoading(true));
    const queryUrl = `https://api.spoonacular.com/recipes/complexSearch?number=${numberOfRecipes}&sort=min-missing-ingredients&sortDirection=asc&instructionsRequired=true&ignorePantry=true&includeIngredients=${ingredients}&cuisine=${cuisine}&type=${meal}&apiKey=${apiKey}`;
    fetch(queryUrl)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setRecipes(data.results));
        dispatch(setRecipesLoading(false));
      })
      .catch((err) => {
        dispatch(setRecipesLoading(true));
        toast.warning(
          'We faced problems getting your recipes, please try again!'
        );
      });
  };
  return (
    <div className='h-auto bg-offWhite rounded-lg flex justify-center p-5'>
      <div
        id='recipeSearchBox'
        className='w-full h-auto py-5 bg-offWhite flex flex-col justify-between gap-5'
      >
        <div className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-widest text-center'>
          Items You've Selected
        </div>
        <div className='text-md xl:text-md tracking-wider italic text-blueGray opacity-50 text-center'>
          {/* {you have not selected any items yet} */}
          {allSelectedItems && allSelectedItems.length > 0
            ? allSelectedItems?.join(', ')
            : 'you have not selected any items yet'}
        </div>

        <div id='buttonsContainer' className='flex gap-1'>
          <div className='w-full flex flex-col xl:flex-row gap-2'>
            <div className='w-full xl:w-1/2'>
              <DropdownSelect name='Cuisine' />
            </div>
            <div className='w-full xl:w-1/2'>
              <DropdownSelect name='Meal' />
            </div>
          </div>
          <div
            className='w-1/5 flex justify-center cursor-pointer'
            onClick={handleSearchRecipe}
          >
            <img src='/images/recipes/search_button.svg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesItemCard;
