import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IRecipe, IRecipeNutrition } from '../interface';
import { Markup } from 'interweave';

const SingleRecipe = () => {
  const { id } = useParams();
  const apiKey = `5962ec749418426c81fa226be6317343`;
  const apiKey2 = `a15745668f894779b75adf57f9d76136`;
  const apiKey3 = `8e4e45b4d72f4a74b59440190f82116e`;
  const apiKey4 = `fc30ca941c9141489055ff119a8ac01c`;

  const recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
  const nutritionUrl = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`;
  const [recipeData, setRecipeData] = useState<IRecipe>();
  const [recipeNutrition, setRecipeNutrition] = useState<IRecipeNutrition>();
  useEffect(() => {
    fetch(recipeUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipeData(data);
      });
    fetch(nutritionUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipeNutrition(data);
      });
  }, [recipeUrl, nutritionUrl]);

  const ingredients = recipeData?.extendedIngredients?.map((ingredient) => (
    <li key={ingredient.id}>{ingredient.original}</li>
  ));
  return (
    <div className='w-full h-full flex flex-col gap-5'>
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

      {/* <div className='flex flex-col md:flex-row  gap-5 md:h-[900px]'>
        <div className='w-full md:w-4/6 flex flex-col gap-2'>
          <div className='h-[200px]  md:h-1/3 overflow-clip bg-offWhite rounded-2xl flex-col flex justify-center items-center gap-1 md:gap-10 '>
            <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full'>
              Ingredients
            </h1>
            <ul>{ingredients}</ul>
          </div>
          <div className='h-[200px] md:h-2/3 overflow-clip bg-offWhite rounded-2xl flex-col flex md:flex-row justify-center items-center gap-1 md:gap-10 '>
            <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full'>
              Instructions
            </h1>
          </div>
        </div>
        <div className='h-[500px] md:w-2/6 md:h-[900px] overflow-clip bg-offWhite rounded-2xl flex-col flex md:flex-row justify-left items-center gap-1 md:gap-10 '></div>
      </div> */}
      <div className='flex gap-1 md:gap-5 h-[500px] md:h-[900px]'>
        <div className='overflow-auto bg-offWhite rounded-2xl flex-col flex justify-evenly items-centers gap-5 w-1/4 p-5'>
          <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full h-auto'>
            Ingredients
          </h1>
          <ul className='text-md text-blueGray text-center tracking-wider w-full px-5 h-full'>
            {ingredients}
          </ul>
        </div>
        <div className='overflow-auto bg-offWhite rounded-2xl flex-col flex justify-evenly items-centers gap-5 w-2/4 p-5'>
          <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full h-auto'>
            Instructions
          </h1>
          <ul className='text-md text-blueGray text-center tracking-wider w-full px-5 h-full'>
            {ingredients}
          </ul>
        </div>
        <div className='overflow-auto bg-offWhite rounded-2xl flex-col flex justify-evenly items-centers gap-5 w-1/4 p-5'>
          <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full h-auto'>
            Nutrition
          </h1>
          <ul className='text-md text-blueGray text-center tracking-wider w-full px-5 h-full'>
            {ingredients}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleRecipe;
