import { configureStore } from "@reduxjs/toolkit";
import { customersSlice } from "./customers/customersSlice";
import { transactionsSlice } from "./transactions/transactionsslice";

export const store = configureStore({
  reducer: {
    customers: customersSlice.reducer,
    transactions: transactionsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch