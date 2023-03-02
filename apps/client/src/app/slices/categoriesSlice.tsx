import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { wordContainsSubstring } from '../../components/utility/functions/wordContainsSubstring';

import { ICategory } from '../../interface';
import { RootState } from '../store';
interface IShelfLife {
  id: number;
  name: string;
  days: number;
}

interface ItemsState {
  category: ICategory;
  categories: ICategory[];
  addItemSelectedCategory: ICategory;
  filteredCategories: ICategory[];
  shelfLife: IShelfLife[];
  status: string;
  error: any;
}
const CATEGORY_URL = '/api/category';

const initialState: ItemsState = {
  category: {
    userId: '',
    id: '',
    name: '',
    dateCreated: '2022-02-18T16:00:00.000Z',
    pantryDays: 0,
    fridgeDays: 0,
    freezerDays: 0,
  },
  categories: [
    {
      userId: '',
      id: '-',
      name: '-',
      dateCreated: '2022-02-18T16:00:00.000Z',
      pantryDays: 0,
      fridgeDays: 0,
      freezerDays: 0,
    },
  ],
  filteredCategories: [
    {
      userId: '',
      id: '-',
      name: '-',
      dateCreated: '2022-02-18T16:00:00.000Z',
      pantryDays: 0,
      fridgeDays: 0,
      freezerDays: 0,
    },
  ],
  shelfLife: [
    { id: 1, name: 'Pantry', days: 0 },
    { id: 2, name: 'Fridge', days: 0 },
    { id: 3, name: 'Freezer', days: 0 },
  ],
  addItemSelectedCategory: {
    userId: '',
    id: '-',
    name: '-',
    dateCreated: '2022-02-18T16:00:00.000Z',
    pantryDays: 0,
    fridgeDays: 0,
    freezerDays: 0,
  },
  status: 'idle',
  error: null,
};

export const fetchAllCategories = createAsyncThunk<ICategory[]>(
  'items/fetchAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(CATEGORY_URL);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createCategory = createAsyncThunk<ICategory, Object>(
  '/users/createCategory',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(CATEGORY_URL, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteCategory = createAsyncThunk<ICategory, Object>(
  '/users/deleteCategory',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(CATEGORY_URL, id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateCategory = createAsyncThunk<ICategory, Object | any>(
  '/users/updateCategory',
  async (data, thunkAPI) => {
    let id = 'a2fb7a43-5aae-43df-a77c-f204f4ea2a35';
    try {
      const response = await axios.put(`${CATEGORY_URL}/${id}`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getCategoryById = createAsyncThunk<ICategory, string | undefined>(
  'users/getCategoryById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${CATEGORY_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategories(state) {
      console.log('categories reset');
      Object.assign(state, initialState);
    },
    setAddItemSelectedCategory(state, action: PayloadAction<ICategory>) {
      state.addItemSelectedCategory = action.payload;
    },
    resetAddItemSelectedCategory(state) {
      Object.assign(
        state.addItemSelectedCategory,
        initialState.addItemSelectedCategory
      );
    },
    resetShelfLife(state) {
      console.log('shelflife reset');
      Object.assign(state.shelfLife, initialState.shelfLife);
    },
    setShelfLife(state, action: PayloadAction<ICategory>) {
      let newShelfLife = [
        {
          id: 1,
          name: `Pantry - ${action.payload.pantryDays} Days`,
          days: action.payload.pantryDays,
        },
        {
          id: 2,
          name: `Fridge - ${action.payload.fridgeDays} Days`,
          days: action.payload.fridgeDays,
        },
        {
          id: 3,
          name: `Freezer - ${action.payload.freezerDays} Days`,
          days: action.payload.freezerDays,
        },
      ];
      state.shelfLife = newShelfLife;
    },
    filterCategories(state, action: PayloadAction<string>) {
      state.filteredCategories = state.categories.filter((item) => {
        return wordContainsSubstring(item.name, action.payload);
      });
    },
  },
  extraReducers: (builder) => {
    // fetch Categories
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.categories = action.payload;
        state.filteredCategories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // get Category by ID
    builder
      .addCase(getCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // create Category
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // update Item
    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    // delete Category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.category = {
          userId: '',
          id: '',
          name: '',
          dateCreated: '',
          pantryDays: 0,
          fridgeDays: 0,
          freezerDays: 0,
        };
        state.categories = state.categories.filter(
          (category) => category.id === action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  resetCategories,
  filterCategories,
  resetAddItemSelectedCategory,
  setAddItemSelectedCategory,
  resetShelfLife,
  setShelfLife,
} = categoriesSlice.actions;

export const showCategories = (state: RootState) => state.category.categories;
export const showAddItemSelectedCategory = (state: RootState) =>
  state.category.addItemSelectedCategory;

export const showFilteredCategories = (state: RootState) =>
  state.category.filteredCategories;

export const getCategory = (state: RootState) => state.category.category;
export const getShelfLife = (state: RootState) => state.category.shelfLife;

export default categoriesSlice.reducer;
