import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IGoogleUser, IUser } from '../../interface';
import { RootState } from '../store';

interface UsersState {
  users: IUser[];
  user: IUser;
  status: string; //'idle' | 'loading' | 'succeeded' | 'failed'
  error: any;
  token: {};
}

const USERS_URL = '/api/user';

const initialState: UsersState = {
  users: [],
  user: {
    id: '',
    password: '',
    name: '',
    image: '',
    email: '',
    dateJoined: '',
  },
  status: 'idle',
  error: {},
  token: '',
};

export const fetchUsers = createAsyncThunk<IUser[]>(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(USERS_URL);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUserById = createAsyncThunk<IUser, string>(
  'users/getUsersById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${USERS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getUserByEmail = createAsyncThunk<IUser, string>(
  'users/getUserByEmail',
  async (email, thunkAPI) => {
    try {
      const response = await axios.get(`${USERS_URL}/findByEmail/${email}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const createUser = createAsyncThunk<IUser, Object>(
  '/users/createUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(USERS_URL, data);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const authenticateUser = createAsyncThunk<Object, Object>(
  '/users/authenticateUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${USERS_URL}/login`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const authenticateGoogleUser = createAsyncThunk<IUser, Object>(
  '/users/authenticateGoogleUser',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${USERS_URL}/google`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// export const updateUser = createAsyncThunk<IUser, Object | any>(
//   '/users/updateUser',
//   async (data, thunkAPI) => {
//     let id = '3c0f0070-19cf-4961-9db9-10194539c177';
//     try {
//       const response = await axios.put(`${USERS_URL}/${id}`, data);
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err);
//     }
//   }
// );

export const updateUserPassword = createAsyncThunk<IUser, Object | any>(
  '/users/updateUserPassword',
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${USERS_URL}/change-password`, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk<IUser, string | undefined>(
  'users/deleteUser',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${USERS_URL}/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<object>) => {
      state.token = action.payload;
    },
    resetUser(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    // fetch Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // get User by ID
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // get User by Email
    builder
      .addCase(getUserByEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.user = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // create User
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        toast.success('Welcome to the family!');
        state.user = action.payload;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // authenticate User
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        // toast.success('You have successfully logged in!');
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // authenticate Google User
    builder
      .addCase(authenticateGoogleUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticateGoogleUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(authenticateGoogleUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // update User
    // builder
    //   .addCase(updateUser.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(updateUser.fulfilled, (state, action) => {
    //     state.status = 'succeeded';
    //     state.user = action.payload;
    //   })
    //   .addCase(updateUser.rejected, (state, action) => {
    //     state.status = 'failed';
    //     state.error = action.error.message;
    //   });

    // Update User Password
    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, initialState);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetUser, setUser, setToken } = usersSlice.actions;
export const showUser = (state: RootState) => state.users.user;
export const showStatus = (state: RootState) => state.users.status;
export const showError = (state: RootState) => state.users.error;
export const allData = (state: RootState) => state;
export const getUserId = (state: RootState) => state.users.token;

export default usersSlice.reducer;
