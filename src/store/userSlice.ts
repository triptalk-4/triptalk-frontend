import { createSlice } from '@reduxjs/toolkit';

interface userSlice {
  userInfo: {
    userId: number;
    name: string;
    profile: string;
    nickname: string;
    email: string;
    password: string;
    aboutMe: string;
    username: string;
  };
}

const initialState: userSlice = {
  userInfo: {
    userId: 0,
    name: '',
    profile: '',
    nickname: '',
    email: '',
    password: '',
    aboutMe: '',
    username: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
