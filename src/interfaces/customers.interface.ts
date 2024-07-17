export interface ICustomerDataRequest {
  full_name: string;
  email: string;
  phone_number: string;
  legal_id: string;
  legal_id_type: string;
}
export interface ICustomerDataResponse {
  id:            string;
  full_name:     string;
  email:         string;
  phone_number:  string;
  legal_id:      string;
  legal_id_type: string;
}
