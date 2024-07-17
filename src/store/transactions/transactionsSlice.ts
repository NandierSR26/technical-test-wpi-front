
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerData, ICardTokenizeRequest, ITransactionDataRequest, PaymentMethod, ShippingAddress } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  tokenizeCardData: ICardTokenizeRequest | null;
  transactionData: ITransactionDataRequest;
}

export const paymentMethodInit: PaymentMethod = {
  type: "",
  token: "",
  installments: 0,
};

export const customerDataInit: CustomerData = {
  phone_number: "",
  full_name: "",
  legal_id: "",
  legal_id_type: "",
};

export const shippingAddressInit: ShippingAddress = {
  address_line_1: "",
  address_line_2: "",
  country: "",
  region: "",
  city: "",
  name: "",
  phone_number: "",
  postal_code: "",
};

export const transactionDataInit: ITransactionDataRequest = {
  amount_in_cents: 0,
  currency: "",
  signature: "",
  customer_email: "",
  payment_method: paymentMethodInit,
  redirect_url: "",
  customer_data: customerDataInit,
  shipping_address: shippingAddressInit,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    isFetching: false,
    tokenizeCardData: null,
    transactionData: transactionDataInit,
  } as InitialState,
  reducers: {
    onModelingTransactionData: (state, { payload }: PayloadAction<ITransactionDataRequest>) => {
      state.transactionData = payload
      state.isFetching = false
    },
    onTokenizrCard: (state, { payload }: PayloadAction<ICardTokenizeRequest>) => {
      state.tokenizeCardData = payload
      state.isFetching = false
    },
    onIsFetching: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetching = payload
    },
    onClear: (state) => {
      state.isFetching = false,
      state.tokenizeCardData = null,
      state.transactionData = transactionDataInit
    }
  },
});

export const {} = transactionsSlice.actions;
