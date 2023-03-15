import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { wordContainsSubstring } from '../../components/utility/functions/wordContainsSubstring';
import {
  IGoogleUser,
  IItem,
  IRecipe,
  IRecipeType,
  IUser,
  NutritionInfo,
} from '../../interface';
import { RootState } from '../store';

interface recipesState {
  cuisines: IRecipeType[];
  filteredCuisines: IRecipeType[];
  meals: IRecipeType[];
  filteredMeals: IRecipeType[];
  selectedItems: IItem[];
  cuisineSelected: IRecipeType;
  mealSelected: IRecipeType;
  recipes: IRecipe[];
  recipesLoading: boolean;
  singleRecipeData: IRecipe;
  singleRecipeNutritionData: NutritionInfo;
}

const initialState: recipesState = {
  cuisines: [
    { id: 1, name: '-' },
    { id: 2, name: 'african' },
    { id: 3, name: 'american' },
    { id: 4, name: 'british' },
    { id: 5, name: 'cajun' },
    { id: 6, name: 'caribbean' },
    { id: 7, name: 'chinese' },
    { id: 8, name: 'eastern european' },
    { id: 9, name: 'european' },
    { id: 10, name: 'french' },
    { id: 11, name: 'german' },
    { id: 12, name: 'greek' },
    { id: 13, name: 'indian' },
    { id: 14, name: 'irish' },
    { id: 15, name: 'italian' },
    { id: 16, name: 'japanese' },
    { id: 17, name: 'jewish' },
    { id: 18, name: 'korean' },
    { id: 19, name: 'latin american' },
    { id: 20, name: 'mediterranean' },
    { id: 21, name: 'mexican' },
    { id: 22, name: 'middle eastern' },
    { id: 23, name: 'nordic' },
    { id: 24, name: 'southern' },
    { id: 25, name: 'spanish' },
    { id: 26, name: 'thai' },
    { id: 27, name: 'vietnamese' },
  ],
  filteredCuisines: [],
  meals: [
    { id: 1, name: '-' },
    { id: 2, name: 'main course' },
    { id: 3, name: 'side dish' },
    { id: 4, name: 'dessert' },
    { id: 5, name: 'appetizer' },
    { id: 6, name: 'salad' },
    { id: 7, name: 'bread' },
    { id: 8, name: 'breakfast' },
    { id: 9, name: 'soup' },
    { id: 10, name: 'beverage' },
    { id: 11, name: 'sauce' },
    { id: 12, name: 'marinade' },
    { id: 13, name: 'fingerfood' },
    { id: 14, name: 'snack' },
    { id: 15, name: 'drink' },
  ],
  filteredMeals: [],
  selectedItems: [],
  cuisineSelected: { id: 1, name: '-' },
  mealSelected: { id: 1, name: '-' },
  recipes: [],
  recipesLoading: true,
  singleRecipeData: { id: 0, title: '', readyInMinutes: 0, servings: 0 },
  singleRecipeNutritionData: {
    bad: [],
    calories: '',
    carbs: '',
    expires: 0,
    fat: '',
    good: [],
    isStale: false,
    protein: '',
  },
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    filterCuisines(state, action: PayloadAction<string>) {
      state.filteredCuisines = state.cuisines.filter((item) => {
        return wordContainsSubstring(item.name, action.payload);
      });
    },
    filterMeals(state, action: PayloadAction<string>) {
      state.filteredMeals = state.meals.filter((item) => {
        return wordContainsSubstring(item.name, action.payload);
      });
    },
    addSelectedItem(state, action: PayloadAction<IItem>) {
      state.selectedItems.unshift(action.payload);
    },
    removeSelectedItem(state, action: PayloadAction<IItem>) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setCuisineSelected(state, action: PayloadAction<IRecipeType>) {
      state.cuisineSelected = action.payload;
    },
    setMealSelected(state, action: PayloadAction<IRecipeType>) {
      state.mealSelected = action.payload;
    },
    setRecipes(state, action: PayloadAction<IRecipe[]>) {
      state.recipes = action.payload;
    },
    setRecipesLoading(state, action: PayloadAction<boolean>) {
      state.recipesLoading = action.payload;
    },
    setSingleRecipeData(state, action: PayloadAction<IRecipe>) {
      state.singleRecipeData = action.payload;
    },
    setSingleRecipeNutrition(state, action: PayloadAction<NutritionInfo>) {
      state.singleRecipeNutritionData = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  filterCuisines,
  filterMeals,
  addSelectedItem,
  removeSelectedItem,
  setCuisineSelected,
  setMealSelected,
  setRecipes,
  setRecipesLoading,
  setSingleRecipeData,
  setSingleRecipeNutrition,
} = recipesSlice.actions;

export const showCuisines = (state: RootState) => state.recipes.cuisines;
export const showSelectedItems = (state: RootState) =>
  state.recipes.selectedItems;

export const showFilteredCuisines = (state: RootState) =>
  state.recipes.filteredCuisines;
export const showMeals = (state: RootState) => state.recipes.meals;
export const showFilteredMeals = (state: RootState) =>
  state.recipes.filteredMeals;
export const showSelectedCuisine = (state: RootState) =>
  state.recipes.cuisineSelected;
export const showSelectedMeal = (state: RootState) =>
  state.recipes.mealSelected;
export const showRecipes = (state: RootState) => state.recipes.recipes;
export const showRecipesLoading = (state: RootState) =>
  state.recipes.recipesLoading;
export const showSingleRecipeData = (state: RootState) =>
  state.recipes.singleRecipeData;
export const showSingleRecipeNutrition = (state: RootState) =>
  state.recipes.singleRecipeNutritionData;
export default recipesSlice.reducer;
