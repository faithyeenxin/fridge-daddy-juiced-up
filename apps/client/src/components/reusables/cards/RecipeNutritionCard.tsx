import React from 'react';
import { NutritionInfo } from '../../../interface';

interface IRecipeNutritionProps {
  recipeNutrition: NutritionInfo | undefined;
}

const RecipeNutritionCard = ({ recipeNutrition }: IRecipeNutritionProps) => {
  return (
    <div className='overflow-auto flex flex-col items-centers gap-5 p-5'>
      <h1 className='xs:text-md sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-lora text-orange text-center tracking-wider w-full h-auto'>
        Nutrition
      </h1>
      <table className='table-auto'>
        <tbody>
          <tr className='font-semibold text-center border-2'>
            <td>Calories: {recipeNutrition?.calories}</td>
            <td>Carbs: {recipeNutrition?.carbs}</td>
            <td>Fat: {recipeNutrition?.fat}</td>
            <td>Protein: {recipeNutrition?.protein}</td>
          </tr>
        </tbody>
      </table>
      <table className='table-auto'>
        <thead>
          <tr className='font-semibold'>
            <td></td>
            <td>Amount</td>
            <td>% Daily Needs</td>
          </tr>
        </thead>
        <tbody>
          {recipeNutrition?.bad.map((item, idx) => (
            <tr key={idx}>
              <td className='text-center text-orange'>{item?.title}</td>
              <td className='text-center text-orange'>{item?.amount}</td>
              <td className='text-center text-orange'>
                {item?.percentOfDailyNeeds}
              </td>
            </tr>
          ))}
          {recipeNutrition?.good.map((item, idx) => (
            <tr key={idx}>
              <td className='text-center text-teal-500'>{item?.title}</td>
              <td className='text-center text-teal-500'>{item?.amount}</td>
              <td className='text-center text-teal-500'>
                {item?.percentOfDailyNeeds}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeNutritionCard;
