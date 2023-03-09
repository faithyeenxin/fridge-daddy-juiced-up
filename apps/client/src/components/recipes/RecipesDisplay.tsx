import React, { useEffect, useState } from 'react';
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

const RecipesDisplay = () => {
  const [randomRecipe, setRandomRecipe] = useState<IRandomRecipe[]>([]);

  //////////////////////////////////////////////////////
  //// * Random Recipe
  //////////////////////////////////////////////////////

  const numberOfRecipes = 12;
  const apiKey = `5962ec749418426c81fa226be6317343`;
  const apiKey2 = `a15745668f894779b75adf57f9d76136`;
  const apiKey3 = `8e4e45b4d72f4a74b59440190f82116e`;

  const randomRecipeUrl = `https://api.spoonacular.com/recipes/random?number=${numberOfRecipes}&apiKey=${apiKey3}`;

  useEffect(() => {
    fetch(randomRecipeUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.recipes);
        setRandomRecipe(data.recipes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className='w-full h-full bg-offWhite rounded-lg flex justify-center p-5 flex-col'>
      {/* Recipes Title */}
      <div id='recipesTitle' className='w-full h-auto py-5'>
        <div className='text-2xl xl:text-3xl font-lora font-bold text-orange tracking-wider text-center'>
          Recipes You'll Love
        </div>
        <div className='text-md xl:text-md tracking-wider italic text-orange text-center'>
          curated specially for you
        </div>
      </div>

      {/* All Recipes */}
      <div className='flex flex-wrap w-full h-full gap-5 justify-center'>
        {randomRecipe.map((recipe, idx) => (
          <div
            key={idx}
            className='w-[270px] h-[320px] bg-tablePink rounded-lg overflow-clip'
          >
            <img src={recipe.image} />
            <div
              id='recipeTitleSection'
              className='flex flex-col justify-center p-2'
            >
              <h1 className='text-md font-lora text-orange text-center'>
                {recipe?.title}
              </h1>
              <h1 className='text-xs  text-blueGray text-center italic opacity-50'>
                Ready In {recipe?.readyInMinutes} Minutes
              </h1>
              <h1 className='text-xs  text-blueGray text-center italic opacity-50'>
                Serves {recipe?.servings}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesDisplay;
