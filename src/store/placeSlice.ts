import { createSlice } from '@reduxjs/toolkit';

interface PlaceSlice {
  selectedPlace: {
    position: {
      lat: number;
      lng: number;
    };
    addressName: string;
    placeName: string;
    roadAddressName: string;
  };
}

const initialState: PlaceSlice = {
  selectedPlace : {
    position: { lat:0, lng:0 },
    addressName: '',
    placeName: '',
    roadAddressName: '',
  },
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload
    },
  },
});

export const { setSelectedPlace } = placeSlice.actions;

export default placeSlice.reducer