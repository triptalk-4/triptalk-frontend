import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddressState {
  address: string[]
}

const initialState: AddressState = {
  address: [], // 주소들을 저장하는 배열 추가
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address.push(action.payload) // 배열에 주소 추가
    },
  },
});

export const { setAddress } = addressSlice.actions

export const store = configureStore({
  reducer: {
    address: addressSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;