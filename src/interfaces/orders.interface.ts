export interface IOrderDataRequest {
  address_line_1: string;
  address_line_2: string;
  country:        string;
  region:         string;
  city:           string;
  postal_code:    string;
  total:          string;
  product_amount: string;
  customer:       string;
  transaction:    string;
  product:        string;
}

export interface IOrderDataResponse {
  order:          Order;
  updatedProduct: UpdatedProduct;
}

export interface Order {
  address_line_1: string;
  address_line_2: string;
  country:        string;
  region:         string;
  city:           string;
  postal_code:    string;
  total:          string;
  product_amount: string;
  customer:       string;
  transaction:    string;
  product:        string;
  id:             string;
}

export interface UpdatedProduct {
  id:          string;
  name:        string;
  description: string;
  price:       number;
  stock:       number;
  image:       string;
}

