import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as hotelService from "../services/hotelService";


export const fetchHotels = createAsyncThunk(
  "hotels/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await hotelService.getHotels(params);
      return response; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const addHotel = createAsyncThunk("hotels/add", async (hotel) => {
  return await hotelService.createHotel(hotel);
});

export const updateHotel = createAsyncThunk("hotels/update", async (hotel) => {
  return await hotelService.updateHotel(hotel);
});

export const removeHotel = createAsyncThunk("hotels/remove", async (id) => {
  await hotelService.deleteHotel(id);
  return id;
});

const hotelSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data;           
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addHotel.fulfilled, () => {
 
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.map((h) =>
          h.id === action.payload.id ? action.payload : h
        );
      })
      .addCase(removeHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter((h) => h.id !== action.payload);
        state.totalCount = Math.max(0, state.totalCount - 1); 
      });
  },
});

export default hotelSlice.reducer;