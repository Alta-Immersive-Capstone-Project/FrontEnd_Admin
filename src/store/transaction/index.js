import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
    name: 'booking',
    initialState: {
        booking: [],
    },
    reducers: {
        setBooking: (state, action) => {
            state.booking = action.payload;
        }
    }
})

export const { setBooking } = transactionSlice.actions;

export default transactionSlice.reducer;