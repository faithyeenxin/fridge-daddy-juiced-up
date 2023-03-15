import React from 'react';
import { IRecipe } from '../../../interface';

interface IRecipeIngredientProps {
  recipeData: IRecipe | undefined;
}

const RecipeIngredientsCard = ({ recipeData }: IRecipeIngredientProps) => {
  const ingredients = recipeData?.extendedIngredients?.map((ingredient) => (
    <li key={ingredient.id} className='list-disc'>
      {ingredient.original}
    </li>
  ));
  return (
    <div className='overflow-auto flex flex-col items-centers gap-5 p-5'>
      <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full h-auto'>
        Ingredients
      </h1>
      <ul className='text-md text-blueGray tracking-wider w-full px-5 h-full flex flex-col gap-5'>
        {ingredients}
      </ul>
    </div>
  );
};

export default RecipeIngredientsCard;
