import { useAppSelector } from "../../hooks/useReduxFunctions"

export const useContainer = () => {
  const state = useAppSelector((state) => ({
    products: state.products.products,
    isFetchingProducts: state.products.isFetching
  }))


  return {
    state
  }
}