import { configureStore } from "@reduxjs/toolkit";
import { customersSlice } from "./customers/customersSlice";
import { transactionsSlice } from "./transactions/transactionsSlice";
import { productSlice } from "./products/productsSlice";

export const store = configureStore({
  reducer: {
    customers: customersSlice.reducer,
    transactions: transactionsSlice.reducer,
    products: productSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch