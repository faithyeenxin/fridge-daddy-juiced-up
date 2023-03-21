import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { showFilteredItems } from '../../app/slices/itemsSlice';
import {
  setRecipes,
  setRecipesLoading,
  showRecipes,
  showRecipesLoading,
} from '../../app/slices/recipesSlice';
import { useAppDispatch, useAppSelector } from '../../app/store';
import RecipeCard from '../reusables/cards/RecipeCard';
import { spoonacularApiKeys } from '../utility/apiKey';

const RecipesDisplay = () => {
  const dispatch = useAppDispatch();
  const recipesLoading = useAppSelector(showRecipesLoading);
  const recipes = useAppSelector(showRecipes);

  //////////////////////////////////////////////////////
  //// * Random Recipe
  //////////////////////////////////////////////////////
  const numberOfRecipes = 20;
  const randomRecipeUrl = `https://api.spoonacular.com/recipes/random?number=${numberOfRecipes}&apiKey=${spoonacularApiKeys[0]}`;
  console.log(randomRecipeUrl);
  useEffect(() => {
    dispatch(setRecipesLoading(true));
    fetch(randomRecipeUrl)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setRecipes(data.recipes));
        dispatch(setRecipesLoading(false));
      })
      .catch(() => {
        toast.error(
          'Sorry we could not get you curated recipes. Please try again.'
        );
      });
  }, []);

  return (
    <div className='w-full h-full bg-offWhite rounded-lg flex justify-center p-5 flex-col'>
      {/* Recipes Title */}
      <div className='py-5'>
        <div className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-wider text-center'>
          Recipes You'll Love
        </div>
        <div className='text-md xl:text-md tracking-wider italic text-orange text-center'>
          curated specially for you
        </div>
      </div>
      {/* All Recipes */}
      <div className='flex flex-col lg:flex-row flex-wrap w-full h-full gap-5 justify-center overflow-auto snap-x'>
        {!recipesLoading ? (
          recipes?.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className='font-lora text-orange opacity-70 text-lg tracking-wider font-light flex justify-center items-center'>
              Sorry we could not find any recipes.
            </div>
          )
        ) : (
          <div className='flex justify-center items-center text-center'>
            <img
              className='flex w-[100px] h-[400px]'
              src='/images/table/full/loading-animation.svg'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesDisplay;
