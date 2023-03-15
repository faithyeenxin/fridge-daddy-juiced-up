import React, { useEffect, useState } from 'react';
import RecipesDisplay from '../components/recipes/RecipesDisplay';
import RecipesItemCard from '../components/recipes/RecipesItemCard';
import DropdownSelect from '../components/reusables/dropdown/DropdownSelect';
import SearchBar from '../components/reusables/SearchBar';
import ItemsTableSmall from '../components/reusables/table/partial/ItemsTableSmall';

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
    <div className='w-full lg:h-[900px] flex flex-col lg:flex-row justify-center gap-5'>
      <div className='h-[500px] w-full lg:w-4/6 lg:h-full'>
        <RecipesDisplay />
      </div>
      {/* Filtering Section */}
      <div className='w-full lg:w-2/6 h-full flex flex-col gap-2'>
        <RecipesItemCard />
        <SearchBar />
        <ItemsTableSmall />
      </div>
    </div>
  );
};

export default Recipes;
