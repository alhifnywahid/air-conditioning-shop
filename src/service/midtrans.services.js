import api from "../api";

export async function midtrans(data) {
  const product = await api.post(`/payments/midtrans`, data);
  return product.data.result;
}
export async function transaction(params) {
  const product = await api.get(`/payments/midtrans-trx?id=${params}`);
  return product.data.result;
}
