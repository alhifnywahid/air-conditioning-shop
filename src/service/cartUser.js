import api from "../api";

export async function addToCart(userId, productId, quantity = 1) {
  try {
    const result = await api.put(`/user/cart`, {
      userId,
      productId,
      quantity,
    });
    const user = result.data.result;
    if (!user) return false;
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function delFromCart(userId, productId) {
  try {
    const result = await api.delete(`/user/cart`, {
      data: { userId, productId },
    });
    const user = result.data;
    if (!user) return false;
    return user;
  } catch (error) {
    console.log(error);
  }
}
