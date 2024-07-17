import { AnyAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { api } from "../../api";
import { onFetching, onGetProductByID, onGetProducts } from "./productsSlice";

const { products } = api();

export const startGetProducts = () => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    try {
      dispatch(onFetching(true));
      await products.seed();
      const { data } = await products.findAll();
      dispatch(onGetProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startGetProductById = (id: string) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    try {
      dispatch(onFetching(true));
      const { data } = await products.findByID(id);
      dispatch(onGetProductByID(data));
    } catch (error) {
      console.log(error);
    }
  };
};
