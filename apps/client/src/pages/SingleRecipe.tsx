import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IRecipe, IRecipeNutrition, NutritionInfo } from '../interface';
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

const SingleRecipe = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const apiKey = `5962ec749418426c81fa226be6317343`;
  const apiKey2 = `a15745668f894779b75adf57f9d76136`;
  const apiKey3 = `8e4e45b4d72f4a74b59440190f82116e`;
  const apiKey4 = `fc30ca941c9141489055ff119a8ac01c`;
  const recipeData = useAppSelector(showSingleRecipeData);
  const recipeNutrition = useAppSelector(showSingleRecipeNutrition);
  const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey3}`;
  const nutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey3}`;
  console.log(recipeUrl);
  console.log(nutritionUrl);
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
          <div className='w-full h-[350px] overflow-clip bg-offWhite rounded-2xl flex-col flex md:flex-row justify-left items-center gap-1 md:gap-10 '>
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
              <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-5xl font-lora text-orange text-center tracking-wider'>
                {recipeData?.title}
              </h1>
              <div className='flex justify-center gap-1'>
                <h1 className='text-xs  text-blueGray text-center italic opacity-50 font-bold'>
                  {recipeData?.readyInMinutes
                    ? `Ready In ${recipeData?.readyInMinutes} Minutes`
                    : ''}
                  ,{' '}
                </h1>
                <h1 className='text-xs  text-blueGray text-center italic opacity-50 font-bold '>
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
            <div className=' bg-offWhite rounded-2xl hidden lg:flex-col lg:flex lg:w-1/5'>
              <RecipeIngredientsCard recipeData={recipeData} />
            </div>
            <div className=' bg-offWhite rounded-2xl lg:flex-col lg:flex lg:w-2/5'>
              <RecipeInstructionsCard recipeData={recipeData} />
            </div>
            <div className=' bg-offWhite rounded-2xl hidden lg:flex-col lg:flex lg:w-2/5'>
              <RecipeNutritionCard recipeNutrition={recipeNutrition} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleRecipe;
