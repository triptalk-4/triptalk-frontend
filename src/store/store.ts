import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import mapAddress from "./mapAddress";


export const store = configureStore({
  reducer: {
    address: mapAddress,
    token: tokenSlice
  },
});


export type RootState = ReturnType<typeof store.getState>;