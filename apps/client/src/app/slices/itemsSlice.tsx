import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import isAfter from 'date-fns/isAfter';
import { toast } from 'react-toastify';
import { IItem } from '../../interface';
import { RootState } from '../store';

interface ItemsState {
  items: IItem[];
  item: IItem;
  userItems: IItem[];
  filteredUserItems: IItem[];
  userItemsLoading: boolean;
  addItemLoading: boolean;
  status: string;
  error: any;
}
const ITEMS_URL = '/api/item';

const initialState: ItemsState = {
  // Get All Items in Database
  items: [],
  // Item in focus (usually used when creation, updating or deleting of item)
  item: {
    userId: '',
    categoryId: '',
    id: '',
    name: '',
    purchaseDate: '2022-02-18T16:00:00.000Z',
    expiryDate: '2022-02-18T16:00:00.000Z',
    storedIn: '',
    quantity: '',
    trashed: false,
  },
  // Items based on User ID
  userItems: [],
  filteredUserItems: [],
  userItemsLoading: false,
  addItemLoading: false,
  status: 'idle',
  error: null,
};

export const fetchAllItems = createAsyncThunk<IItem[]>(
  'items/fetchAllItems',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(ITEMS_URL);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getItemsByUserId = createAsyncThunk<IItem[], string>(
  'users/getItemsByUserId',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${ITEMS_URL}/user/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getItemByItemId = createAsyncThunk<IItem, string | undefined>(
  'users/getItemByItemId',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${ITEMS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createItem = createAsyncThunk<IItem, Object>(
  '/users/createItem',
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.post(ITEMS_URL, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const trashItem = createAsyncThunk<IItem, string | undefined>(
  '/users/trashItem',
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(`${ITEMS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const untrashItem = createAsyncThunk<IItem, string | undefined>(
  '/users/untrashItem',
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(`${ITEMS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const trashAllItems = createAsyncThunk<IItem[], string>(
  'users/trashAllItems',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${ITEMS_URL}/user/${id}/trash-all`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateItem = createAsyncThunk<IItem, Object | any>(
  '/users/updateItem',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${ITEMS_URL}/${data.id}`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    resetItems(state) {
      Object.assign(state, initialState);
    },
    setFilterToLoading(state) {
      state.userItemsLoading = true;
    },
    updateFilteredItems(state, action: PayloadAction<IItem[]>) {
      state.filteredUserItems = action.payload;
      state.userItemsLoading = false;
    },
    getItemById(state, action: PayloadAction<string>) {
      state.item = state.userItems.filter(
        (item) => item.id === action.payload
      )[0];
    },
  },
  extraReducers: (builder) => {
    // fetch all items in database
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // get Item by User ID
    builder
      .addCase(getItemsByUserId.pending, (state) => {
        state.status = 'loading';
        state.userItemsLoading = true;
      })
      .addCase(getItemsByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userItemsLoading = false;
        state.userItems = action.payload;
        state.filteredUserItems = action.payload;
      })
      .addCase(getItemsByUserId.rejected, (state, action) => {
        state.status = 'failed';
        state.userItemsLoading = true;
        state.error = action.error.message;
        toast.error('We could not get your items, try logging in again!');
      });
    // get Item by Item ID
    builder
      .addCase(getItemByItemId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItemByItemId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload;
      })
      .addCase(getItemByItemId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error('We could not get your item, try again!');
      });
    // create Item
    builder
      .addCase(createItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userItems.unshift(action.payload);
        state.filteredUserItems.unshift(action.payload);
        state.item = action.payload;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error('We could not update your item, try again!');
      });
    // update Item
    builder
      .addCase(updateItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.userItems = state.userItems.filter(
        //   (item) => item.id !== action.payload.id
        // );
        // state.filteredUserItems = state.filteredUserItems.filter(
        //   (item) => item.id !== action.payload.id
        // );
        // state.userItems.unshift(action.payload);
        // state.filteredUserItems.unshift(action.payload);
        state.item = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // trash Item by ID
    builder
      .addCase(trashItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(trashItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.item = {
          userId: '',
          id: '',
          name: '',
          categoryId: '',
          purchaseDate: '',
          expiryDate: '',
          storedIn: '',
          quantity: '',
          trashed: false,
        };
        console.log(action.payload);
        state.userItems = state.userItems.map((item) => {
          if (item.id === action.payload.id) {
            let newItem = {
              userId: item.userId,
              id: item.id,
              name: item.name,
              categoryId: item.categoryId,
              purchaseDate: item.purchaseDate,
              expiryDate: item.expiryDate,
              storedIn: item.storedIn,
              quantity: item.quantity,
              trashed: action.payload.trashed,
            };
            return newItem;
          } else {
            return item;
          }
        });
        state.filteredUserItems = state.userItems.map((item) => {
          if (item.id === action.payload.id) {
            let newItem = {
              userId: item.userId,
              id: item.id,
              name: item.name,
              categoryId: item.categoryId,
              purchaseDate: item.purchaseDate,
              expiryDate: item.expiryDate,
              storedIn: item.storedIn,
              quantity: item.quantity,
              trashed: action.payload.trashed,
            };
            return newItem;
          } else {
            return item;
          }
        });
      })
      .addCase(trashItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error('We could not trash your item, try again!');
      });
    // trash all items
    builder
      .addCase(trashAllItems.pending, (state) => {
        state.status = 'loading';
        state.userItemsLoading = true;
      })
      .addCase(trashAllItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userItemsLoading = false;
        state.userItems = action.payload;
        state.filteredUserItems = action.payload;
      })
      .addCase(trashAllItems.rejected, (state, action) => {
        state.status = 'failed';
        state.userItemsLoading = true;
        state.error = action.error.message;
        toast.error('We could not trash all your items, try again!');
      });
    // untrash items by id
    builder
      .addCase(untrashItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(untrashItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.userItems = state.userItems.map((item) => {
          if (item.id === action.payload.id) {
            let newItem = {
              userId: item.userId,
              id: item.id,
              name: item.name,
              categoryId: item.categoryId,
              purchaseDate: item.purchaseDate,
              expiryDate: item.expiryDate,
              storedIn: item.storedIn,
              quantity: item.quantity,
              trashed: action.payload.trashed,
            };
            return newItem;
          } else {
            return item;
          }
        });
        state.filteredUserItems = state.userItems.map((item) => {
          if (item.id === action.payload.id) {
            let newItem = {
              userId: item.userId,
              id: item.id,
              name: item.name,
              categoryId: item.categoryId,
              purchaseDate: item.purchaseDate,
              expiryDate: item.expiryDate,
              storedIn: item.storedIn,
              quantity: item.quantity,
              trashed: action.payload.trashed,
            };
            return newItem;
          } else {
            return item;
          }
        });
      })
      .addCase(untrashItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error('We could not remove your item from trash, try again!');
      });
  },
});

export const {
  resetItems,
  updateFilteredItems,
  setFilterToLoading,
  getItemById,
} = itemsSlice.actions;
export const showItem = (state: RootState) => state.items.item;
export const showItems = (state: RootState) => state.items.items;
export const showUserItems = (state: RootState) => state.items.userItems;
export const showFilteredItems = (state: RootState) =>
  state.items.filteredUserItems;
export const showUserItemsLoadingState = (state: RootState) =>
  state.items.userItemsLoading;
export const showAddItemLoadingState = (state: RootState) =>
  state.items.addItemLoading;
export const getItemAdded = (state: RootState) => state.items.item;
export default itemsSlice.reducer;
