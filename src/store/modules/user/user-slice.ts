import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/types/user';

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: InitialState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectUser: (state: InitialState) => state.user,
  },
});

export const { setUser } = userSlice.actions;
export const { selectUser } = userSlice.selectors;
export default userSlice.reducer;
