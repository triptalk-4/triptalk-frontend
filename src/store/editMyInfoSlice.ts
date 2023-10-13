import { createSlice } from '@reduxjs/toolkit';

const editMyInfoSlice = createSlice({
  name: 'editMyInfo',
  initialState: {
    editedNickname: '',
    editedNewPassword: '',
    editedAboutMe: '',
    currentEmail: '',
  },
  reducers: {
    setEditedNickname: (state, action) => {
      state.editedNickname = action.payload;
    },
    setEditedNewPassword: (state, action) => {
      state.editedNewPassword = action.payload;
    },
    setEditedAboutMe: (state, action) => {
      state.editedAboutMe = action.payload;
    },
    setCurrentEmail: (state, action) => {
      state.currentEmail = action.payload;
    },
  },
});

export const { setEditedNickname, setEditedNewPassword, setEditedAboutMe, setCurrentEmail } = editMyInfoSlice.actions;

export default editMyInfoSlice.reducer;
