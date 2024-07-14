import axios from "axios";

export async function getImages(orientation, page) {
	const images = await axios.get(import.meta.env.VITE_BASE_URL + `/photo?orientation=${orientation}&page=${page}&search=air conditioner`);
	return images.data.result;
}
