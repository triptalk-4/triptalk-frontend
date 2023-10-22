import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from './tokenSlice';
import mapAddress from './mapAddress';
import editMyInfoSlice from './editMyInfoSlice';
import placeSlice from './placeSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    address: mapAddress,
    token: tokenSlice,
    editMyInfo: editMyInfoSlice, // 개인정보수정
    place: placeSlice,
    user: userSlice, // 개인정보
  },
});

export type RootState = ReturnType<typeof store.getState>;
