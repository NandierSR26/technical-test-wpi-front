export interface ITransactionDataRequest {
  acceptance_token?: string;
  amount_in_cents:  number;
  currency:         string;
  signature:        string;
  customer_email:   string;
  payment_method:   PaymentMethod;
  redirect_url:     string;
  reference?:        string;
  customer_data:    CustomerData;
  shipping_address: ShippingAddress;
}

export interface ICardTokenizeRequest {
  number:      string;
  cvc:         string;
  exp_month:   string;
  exp_year:    string;
  card_holder: string;
}

export interface CustomerData {
  phone_number:  string;
  full_name:     string;
  legal_id:      string;
  legal_id_type: string;
}

export interface PaymentMethod {
  type:         string;
  token:        string;
  installments: number;
}

export interface ShippingAddress {
  address_line_1: string;
  address_line_2: string;
  country:        string;
  region:         string;
  city:           string;
  name:           string;
  phone_number:   string;
  postal_code:    string;
}
