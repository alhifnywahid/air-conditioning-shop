import axios from "axios";

export async function register(name, email, password) {
	const result = await axios.post(import.meta.env.VITE_BASE_URL + "/user", {
		name,
		email,
		password,
	});
	const data = result.data;
	return data;
}
