import api from "../api";
export async function getUser(token) {
  try {
    const result = await api.get(`/user/${token}`);
    const user = result.data.result;
    if (!user) return false;
    return user;
  } catch (error) {
    console.log(error);
  }
}
