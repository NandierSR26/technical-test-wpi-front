import { AxiosInstance } from "axios";
import { ICustomerDataRequest, ICustomerDataResponse } from "../../interfaces";

export default function Actions(api: AxiosInstance) {
  return {
    create: (data: ICustomerDataRequest) => api.post<ICustomerDataResponse>('/customers', data)
  }
}