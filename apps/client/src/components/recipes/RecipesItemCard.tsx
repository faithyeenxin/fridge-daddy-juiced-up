import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { showFilteredItems } from '../../app/slices/itemsSlice';
import {
  setRecipes,
  setRecipesLoading,
  showSelectedCuisine,
  showSelectedMeal,
} from '../../app/slices/recipesSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import DropdownSelect from '../reusables/dropdown/DropdownSelect';
import { spoonacularApiKeys } from '../utility/apiKey';
const RecipesItemCard = () => {
  const dispatch = useAppDispatch();
  const filteredItems = useAppSelector(showFilteredItems);
  const cuisineInput = useAppSelector(showSelectedCuisine);
  const mealInput = useAppSelector(showSelectedMeal);
  const numberOfRecipes = 20;

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
    const queryUrl = `https://api.spoonacular.com/recipes/complexSearch?number=${numberOfRecipes}&sort=min-missing-ingredients&sortDirection=asc&instructionsRequired=true&ignorePantry=true&includeIngredients=${ingredients}&cuisine=${cuisine}&type=${meal}&apiKey=${spoonacularApiKeys[0]}`;
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
    <div className='h-auto bg-bgColorPeachBeige rounded-lg flex justify-center p-5'>
      <div
        id='recipeSearchBox'
        className='w-full h-auto py-5 bg-bgColorPeachBeige flex flex-col justify-between gap-5'
      >
        <div className='text-2xl xl:text-3xl font-lato font-bold text-orange tracking-widest text-center'>
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
