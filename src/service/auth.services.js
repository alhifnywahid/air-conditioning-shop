import api from "../api";

export async function auth(email, password) {
  const result = await api.post("/user/login", {
    email,
    password,
  });
  const auth = result.data;
  return auth;
}
