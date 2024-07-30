import api from "../api";

export async function searchProducts(q, page = 1, limit = 12) {
  const products = await api.get(
    `/productsearch?q=${q}&page=${page}&limit=${limit}`,
  );
  if (!products.data.status) return products.data.message;
  return products.data.result;
}
