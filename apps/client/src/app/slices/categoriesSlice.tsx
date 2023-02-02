import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { ICategory } from "../../interface";
import { RootState } from "../store";

interface ItemsState {
  category: ICategory;
  categories: ICategory[];
  status: string;
  error: any;
}
const CATEGORY_URL = "/api/category";

const initialState: ItemsState = {
  category: {
    id: "",
    name: "",
    dateCreated: "2022-02-18T16:00:00.000Z",
    pantryDays: 0,
    fridgeDays: 0,
    freezerDays: 0,
  },
  categories: [
    {
      id: "-",
      name: "-",
      dateCreated: "2022-02-18T16:00:00.000Z",
      pantryDays: 0,
      fridgeDays: 0,
      freezerDays: 0,
    },
  ],
  status: "idle",
  error: null,
};

export const fetchAllCategories = createAsyncThunk<ICategory[]>(
  "items/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(CATEGORY_URL);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// export const getCategoryById = createAsyncThunk<ICategory, string>(
//   "users/getCategoryById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.get(`${CATEGORY_URL}/${id}`);
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

export const createCategory = createAsyncThunk<ICategory, Object>(
  "/users/createCategory",
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
  "/users/deleteCategory",
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
  "/users/updateCategory",
  async (data, thunkAPI) => {
    let id = "a2fb7a43-5aae-43df-a77c-f204f4ea2a35";
    try {
      const response = await axios.put(`${CATEGORY_URL}/${id}`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories(state) {
      console.log("categories reset");
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    // fetch Categories
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // create Category
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // update Item
    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // delete Category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.category = {
          id: "",
          name: "",
          dateCreated: "",
          pantryDays: 0,
          fridgeDays: 0,
          freezerDays: 0,
        };
        state.categories = state.categories.filter(
          (category) => category.id === action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetCategories } = categoriesSlice.actions;

export const showCategories = (state: RootState) => state.category.categories;
export const getCategory = (state: RootState) => state.category.category;

export default categoriesSlice.reducer;
