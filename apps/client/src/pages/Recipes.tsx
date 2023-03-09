import React, { useEffect, useState } from 'react';
import RecipesDisplay from '../components/recipes/RecipesDisplay';
import DropdownSelect from '../components/reusables/dropdown/DropdownSelect';

interface IRandomRecipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceName?: string;
  sourceUrl?: string;
  spoonacularScore: number;
  healthScore?: number;
  pricePerServing?: number;
  analyzedInstructions: {
    name?: string;
    steps: {
      number: number;
      step: string;
      ingredients?: {
        id: number;
        name: string;
        localizedName: string;
        image?: string;
      }[];
      equipment?: {
        id: number;
        name: string;
        localizedName: string;
        image?: string;
      }[];
      length?: {
        number: number;
        unit: string;
      };
    }[];
  }[];
  extendedIngredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    measures: {
      metric: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
      us: {
        amount: number;
        unitLong: string;
        unitShort: string;
      };
    };
    originalString: string;
    originalName: string;
    metaInformation?: string[];
    image?: string;
  }[];
}

const Recipes = () => {
  return (
    <div className='w-full h-full overflow-auto flex justify-center gap-5'>
      <div className='w-3/4 h-full'>
        <RecipesDisplay />
      </div>
      {/* Filtering Section */}
      <div className='w-1/4 h-full'>
        <div className='h-full bg-offWhite rounded-lg flex justify-center p-5'>
          <div
            id='recipeSearchBox'
            className='w-full h-auto py-5 bg-offWhite flex flex-col justify-between gap-5'
          >
            <div className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-widest text-center'>
              Items you've selected
            </div>
            <div className='text-md xl:text-md tracking-wider italic text-blueGray opacity-50 text-center'>
              you have not selected any items yet
            </div>

            <div id='buttonsContainer' className='flex gap-2'>
              <div className='w-2/5'>
                <DropdownSelect name='Cuisine' />
              </div>
              <div className='w-2/5'>
                <DropdownSelect name='Meal' />
              </div>
              <div className='w-1/5 flex justify-center'>
                <img src='images/recipes/search_button.svg' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
