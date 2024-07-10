import axios from "axios";

export async function products(page, limit) {
	const products = await axios.get(import.meta.env.VITE_BASE_URL + `/products?page=${page}&limit=${limit}`);
	return products.data.result;
}
