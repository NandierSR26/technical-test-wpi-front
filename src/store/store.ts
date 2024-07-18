import { configureStore } from "@reduxjs/toolkit";
import { customersSlice } from "./customers/customersSlice";
import { transactionsSlice } from "./transactions/transactionsSlice";
import { productSlice } from "./products/productsSlice";
import { uiSlice } from "./ui/uiSlice";
import { ordersSclice } from "./orders/ordersSlice";

export const store = configureStore({
  reducer: {
    customers: customersSlice.reducer,
    transactions: transactionsSlice.reducer,
    products: productSlice.reducer,
    orders: ordersSclice.reducer,
    ui: uiSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch