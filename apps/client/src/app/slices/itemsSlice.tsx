import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import isAfter from "date-fns/isAfter";
import { IItem } from "../../interface";
import { RootState } from "../store";

interface ItemsState {
  items: IItem[];
  item: IItem;
  userItems: IItem[];
  // evergreen: IItem[];
  // rotten: IItem[];
  // trashed: IItem[];
  filteredUserItems: IItem[];
  status: string;
  error: any;
}
const ITEMS_URL = "/api/item";

const initialState: ItemsState = {
  // Get All Items in Database
  items: [
    // {
    //   id: "",
    //   name: "",
    //   purchaseDate: "2022-02-18T16:00:00.000Z",
    //   expiryDate: "2022-02-18T16:00:00.000Z",
    //   storedIn: "",
    //   quantity: "",
    //   trashed: false,
    // },
  ],
  // Item in focus (usually used when creation, updating or deleting of item)
  item: {
    id: "",
    name: "",
    purchaseDate: "2022-02-18T16:00:00.000Z",
    expiryDate: "2022-02-18T16:00:00.000Z",
    storedIn: "",
    quantity: "",
    trashed: false,
  },
  // Items based on User ID
  userItems: [],
  // evergreen: [
  //   {
  //     id: "",
  //     name: "",
  //     purchaseDate: "2022-02-18T16:00:00.000Z",
  //     expiryDate: "2022-02-18T16:00:00.000Z",
  //     storedIn: "",
  //     quantity: "",
  //     trashed: false,
  //   },
  // ],
  // rotten: [
  //   {
  //     id: "",
  //     name: "",
  //     purchaseDate: "2022-02-18T16:00:00.000Z",
  //     expiryDate: "2022-02-18T16:00:00.000Z",
  //     storedIn: "",
  //     quantity: "",
  //     trashed: false,
  //   },
  // ],
  // trashed: [
  //   {
  //     id: "",
  //     name: "",
  //     purchaseDate: "2022-02-18T16:00:00.000Z",
  //     expiryDate: "2022-02-18T16:00:00.000Z",
  //     storedIn: "",
  //     quantity: "",
  //     trashed: false,
  //   },
  // ],
  filteredUserItems: [],
  status: "idle",
  error: null,
};

export const fetchAllItems = createAsyncThunk<IItem[]>(
  "items/fetchAllItems",
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
  "users/getItemsByUserId",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${ITEMS_URL}/user/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createItem = createAsyncThunk<IItem, Object>(
  "/users/createItem",
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

export const trashItem = createAsyncThunk<IItem, string>(
  "/users/trashItem",
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(`${ITEMS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const untrashItem = createAsyncThunk<IItem, string>(
  "/users/untrashItem",
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(`${ITEMS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateItem = createAsyncThunk<IItem, Object | any>(
  "/users/updateItem",
  async (data, thunkAPI) => {
    let id = "3c0f0070-19cf-4961-9db9-10194539c177";
    try {
      const response = await axios.put(`${ITEMS_URL}/${id}`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    resetItems(state) {
      console.log("items reset");
      Object.assign(state, initialState);
    },
    updateFilteredItems(state, action: PayloadAction<IItem[]>) {
      console.log("items filtered in slice");
      console.log(action.payload)
      Object.assign(state.filteredUserItems, action.payload);
    }
  },
  extraReducers: (builder) => {
    // fetch all items in database
    builder
      .addCase(fetchAllItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get Item by User ID
    builder
      .addCase(getItemsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItemsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userItems = action.payload;
        state.filteredUserItems = action.payload;
        // state.evergreen = action.payload.filter(
        //   (item: any) =>
        //     isAfter(new Date(item.expiryDate), new Date()) &&
        //     item.trashed === false
        // );
        // state.rotten = action.payload.filter(
        //   (item: any) =>
        //     isAfter(new Date(), new Date(item.expiryDate)) &&
        //     item.trashed === false
        // );
        // state.trashed = action.payload.filter(
        //   (item: any) => item.trashed === true
        // );
      })
      .addCase(getItemsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // create Item
    builder
      .addCase(createItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userItems.unshift(action.payload);
        // if (
        //   isAfter(new Date(action.payload.expiryDate), new Date()) &&
        //   action.payload.trashed === false
        // ) {
        //   state.evergreen.unshift(action.payload);
        // } else if (
        //   isAfter(new Date(), new Date(action.payload.expiryDate)) &&
        //   action.payload.trashed === false
        // ) {
        //   state.rotten.unshift(action.payload);
        // } else if (action.payload.trashed === true) {
        //   state.trashed.unshift(action.payload);
        // }
        state.item = action.payload;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // update Item
    builder
      .addCase(updateItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // trash Item
    builder
      .addCase(trashItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(trashItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.item = {
          id: "",
          name: "",
          purchaseDate: "",
          expiryDate: "",
          storedIn: "",
          quantity: "",
          trashed: false,
        };
        console.log(action.payload);
        state.userItems = state.userItems.map((item) => {
          if (item.id === action.payload.id) {
            let newItem = {
              id: item.id,
              name: item.name,
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
        // if (isAfter(new Date(action.payload.expiryDate), new Date())) {
        //   state.evergreen = state.evergreen.filter(
        //     (item) => item.id !== action.payload.id
        //   );
        //   state.trashed.unshift(action.payload);
        // } else if (isAfter(new Date(), new Date(action.payload.expiryDate))) {
        //   state.rotten = state.rotten.filter(
        //     (item) => item.id !== action.payload.id
        //   );
        //   state.trashed.unshift(action.payload);
        // }
      })
      .addCase(trashItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(untrashItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(untrashItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.userItems = state.userItems.map((item) => {
          if (item.id === action.payload.id) {
            let newItem = {
              id: item.id,
              name: item.name,
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
        // if (
        //   isAfter(new Date(action.payload.expiryDate), new Date()) &&
        //   action.payload.trashed !== true
        // ) {
        //   state.evergreen.unshift(action.payload);
        //   state.trashed = state.trashed.filter(
        //     (item) => item.id !== action.payload.id
        //   );
        // } else if (
        //   isAfter(new Date(), new Date(action.payload.expiryDate)) &&
        //   action.payload.trashed !== true
        // ) {
        //   state.rotten.unshift(action.payload);
        //   state.trashed = state.trashed.filter(
        //     (item) => item.id !== action.payload.id
        //   );
        // }
      })
      .addCase(untrashItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetItems, updateFilteredItems } = itemsSlice.actions;
export const showItems = (state: RootState) => state.items.items;
export const showUserItems = (state: RootState) => state.items.userItems;
export const getItemAdded = (state: RootState) => state.items.item;
export default itemsSlice.reducer;
// export const getEvergreenItems = (state: RootState) => state.items.evergreen;
// export const getRottenItems = (state: RootState) => state.items.rotten;
// export const getTrashedItems = (state: RootState) => state.items.trashed;
