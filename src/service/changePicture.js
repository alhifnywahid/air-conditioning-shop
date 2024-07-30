import api from "../api";

export async function changePicture(url, userId) {
  const result = await api.put("/user/picture", {
    url: url,
    userId: userId,
  });
  const picture = result.data;
  return picture;
}
