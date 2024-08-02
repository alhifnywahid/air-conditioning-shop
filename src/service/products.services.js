import api from "../api";

export async function products(page, limit) {
  const products = await api.get(`/products?page=${page}&limit=${limit}`);
  return products.data.result;
}
