import api from "../api";

export async function getImages(orientation, page) {
  const images = await api.get(
    `/photo?orientation=${orientation}&page=${page}&search=air conditioner`,
  );
  return images.data.result;
}
