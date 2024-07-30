import api from "../api";

export async function register(name, email, password) {
  const result = await api.post("/user", {
    name,
    email,
    password,
  });
  const data = result.data;
  return data;
}
