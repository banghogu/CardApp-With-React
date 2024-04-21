import { user } from '@/models/user';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: user | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setUserImg: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          photoURL: action.payload,
        };
      }
    },
  },
});

export const { setUser, clearUser, setUserImg } = userSlice.actions;
export default userSlice.reducer;
