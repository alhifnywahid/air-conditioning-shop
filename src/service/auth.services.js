import axios from "axios";

export async function auth(email, password) {
	const result = await axios.post(import.meta.env.VITE_BASE_URL + "/user/login", {
		email,
		password,
	});
	const auth = result.data;
	return auth;
}
