import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Markup } from 'interweave';
import RecipeIngredientsCard from '../components/reusables/cards/RecipeIngredientsCard';
import RecipeInstructionsCard from '../components/reusables/cards/RecipeInstructionsCard';
import RecipeNutritionCard from '../components/reusables/cards/RecipeNutritionCard';
import { useAppDispatch, useAppSelector } from '../app/store';
import {
  setSingleRecipeData,
  setSingleRecipeNutrition,
  showSingleRecipeData,
  showSingleRecipeNutrition,
} from '../app/slices/recipesSlice';
import { checkApiKey } from '../components/utility/apiKey';
import { spoonacularApiKeys } from '../components/utility/apiKey';
const SingleRecipe = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const recipeData = useAppSelector(showSingleRecipeData);
  const recipeNutrition = useAppSelector(showSingleRecipeNutrition);
  const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularApiKeys[0]}`;
  const nutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${spoonacularApiKeys[0]}`;

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(recipeUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setSingleRecipeData(data));
      });
    fetch(nutritionUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setSingleRecipeNutrition(data));
        setLoading(false);
      });
  }, [recipeUrl, nutritionUrl]);

  return (
    <div className='w-full h-full flex flex-col gap-5'>
      {loading && (
        <div className='flex justify-center items-center text-center'>
          <img
            className='flex w-[100px] h-[400px]'
            src='/images/table/full/loading-animation.svg'
          />
        </div>
      )}
      {!loading && (
        <>
          {/* Recipe Summary Section */}
          <div className='w-full h-[350px] overflow-clip bg-bgColorPeachBeige rounded-2xl flex-col flex md:flex-row justify-left items-center gap-1 md:gap-10 '>
            <div className='h-2/3 md:w-1/3 md:h-full overflow-hidden'>
              <img
                className='object-fill md:w-full md:h-[350px]'
                src={recipeData?.image}
              />
            </div>
            <div
              id='recipeContent'
              className='flex flex-col h-1/3 md:h-full justify-center p-5 gap-1 md:gap-3 w-full md:w-[90%] lg:w-[70%]'
            >
              <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-5xl font-lato text-orange text-center tracking-wider'>
                {recipeData?.title}
              </h1>
              <div className='flex justify-center gap-1'>
                <h1 className='text-xs  text-blueGray text-center italic opacity-50 font-normal'>
                  {recipeData?.readyInMinutes
                    ? `Ready In ${recipeData?.readyInMinutes} Minutes`
                    : ''}
                  ,{' '}
                </h1>
                <h1 className='text-xs  text-blueGray text-center italic opacity-50 font-normal '>
                  {recipeData?.servings
                    ? `Serves ${recipeData?.servings}`
                    : `Ingredients utilised: ${recipeData?.usedIngredientCount}`}
                </h1>
              </div>
              <h1 className='text-xs  text-blueGray text-center italic opacity-50 overflow-auto hidden md:block'>
                <Markup content={recipeData?.summary} />
              </h1>
            </div>
          </div>
          <div className='flex gap-1 md:gap-5 h-[800px] md:h-[1200px]'>
            <div className=' bg-bgColorPeachBeige rounded-2xl hidden lg:flex-col lg:flex lg:w-1/5'>
              <RecipeIngredientsCard recipeData={recipeData} />
            </div>
            <div className=' bg-bgColorPeachBeige rounded-2xl lg:flex-col lg:flex lg:w-2/5'>
              <RecipeInstructionsCard recipeData={recipeData} />
            </div>
            <div className=' bg-bgColorPeachBeige rounded-2xl hidden lg:flex-col lg:flex lg:w-2/5'>
              <RecipeNutritionCard recipeNutrition={recipeNutrition} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleRecipe;
