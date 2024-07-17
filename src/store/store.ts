import { configureStore } from "@reduxjs/toolkit";
import { customersSlice } from "./customers/customersSlice";

export const store = configureStore({
  reducer: {
    customers: customersSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch