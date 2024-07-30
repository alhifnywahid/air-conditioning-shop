import api from "../api";

export async function addAdress(userId, data, addressId) {
  const config = addressId ? { userId, data, addressId } : { userId, data };
  const result = await api.put("/user/address", config);
  return result.data;
}
export async function delAddress(userId, addressId) {
  const res = await api.delete("/user/address", {
    data: {
      userId,
      addressId,
    },
  });
  return res.data;
}
