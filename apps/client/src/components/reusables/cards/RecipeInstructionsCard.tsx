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
        <div key={idx} className='list-decimal'>
          {instruction.step}
        </div>
      )
    );
  return (
    <div className='flex flex-col items-centers gap-5 p-5 w-full h-full'>
      <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lato text-orange text-center tracking-wider w-full h-auto'>
        Instructions
      </h1>
      <ul className='text-md text-blueGray tracking-wider w-full px-10 h-full flex flex-col gap-5 overflow-auto'>
        {instructions}
      </ul>
    </div>
  );
};

export default RecipeInstructionsCard;
