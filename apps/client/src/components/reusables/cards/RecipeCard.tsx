import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IRecipe } from '../../../interface';

interface IRecipeCardProps {
  recipe: IRecipe;
}

const RecipeCard = ({ recipe }: IRecipeCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      key={recipe.id}
      className='w-[230px] h-[300px] bg-tablePink rounded-lg overflow-clip cursor-pointer snap-center'
      onClick={() => navigate(`/recipes/${recipe.id}`)}
    >
      <img src={recipe.image} />
      <div id='recipeTitleSection' className='flex flex-col justify-center p-2'>
        <h1 className='text-md font-lora text-orange text-center'>
          {recipe?.title}
        </h1>
        <h1 className='text-xs  text-blueGray text-center italic opacity-50'>
          {recipe?.readyInMinutes
            ? `Ready In ${recipe?.readyInMinutes} Minutes`
            : ''}
        </h1>
        <h1 className='text-xs  text-blueGray text-center italic opacity-50'>
          {recipe?.servings
            ? `Serves ${recipe?.servings}`
            : `Ingredients utilised: ${recipe?.usedIngredientCount}`}
        </h1>
      </div>
    </div>
  );
};

export default RecipeCard;
