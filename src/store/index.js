import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from './transaction'

export default configureStore({
    reducer: {
        booking: bookingReducer
    },
})