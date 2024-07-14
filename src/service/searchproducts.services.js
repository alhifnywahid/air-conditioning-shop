import axios from "axios";

export async function searchProducts(q, page = 1, limit = 12) {
	const products = await axios.get(import.meta.env.VITE_BASE_URL + `/productsearch?q=${q}&page=${page}&limit=${limit}`);
	if (!products.data.status) return products.data.message;
	return products.data.result;
}
