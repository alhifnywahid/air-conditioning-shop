import api from "../api";

export async function product(id) {
  const product = await api.get(`/product/${id}`);
  return product.data.result;
}
