import { AxiosInstance } from "axios";
import { IProductDataResponse } from "../../interfaces";

export default function Action(api: AxiosInstance) {
  return {
    seed: () => api.get('/products/insert'),
    findAll: () => api.get<IProductDataResponse[]>('/products'),
    findByID: (id: string) => api.get<IProductDataResponse>(`/products/${id}`)
  }
}