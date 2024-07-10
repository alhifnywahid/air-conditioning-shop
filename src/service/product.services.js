import axios from "axios";

export async function product(id) {
	const product = await axios.get(import.meta.env.VITE_BASE_URL + `/product/${id}`);
	return product.data.result;
}
