import React from 'react';
import { IRecipe } from '../../../interface';

interface IRecipeInstructionsProps {
  recipeData: IRecipe | undefined;
}

const RecipeInstructionsCard = ({ recipeData }: IRecipeInstructionsProps) => {
  const instructions =
    recipeData?.analyzedInstructions &&
    recipeData?.analyzedInstructions[0]?.steps?.map(
      (instruction: any, idx: number) => (
        <li key={idx} className='list-decimal'>
          {instruction.step}
        </li>
      )
    );
  return (
    <div className='overflow-auto flex flex-col items-centers gap-5 p-5'>
      <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full h-auto'>
        Instructions
      </h1>
      <ul className='text-md text-blueGray tracking-wider w-full px-5 h-full flex flex-col gap-5'>
        {instructions}
      </ul>
    </div>
  );
};

export default RecipeInstructionsCard;
