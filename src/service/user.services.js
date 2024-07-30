import api from "../api";

export async function orders(userId, data) {
  const result = await api.put("/user/orders", data);
  return result.data;
}
