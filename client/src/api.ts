import axios from 'axios';

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:8080"

//Register a new user by sending a POST request to the backend.
export async function registerUser(username: string, password: string) : Promise<void> {
  try {
    await axios.post(`${BASE_URL}/user`, {username : username, password: password});
  } catch (e:any) {
    console.log(e);
  }
}

//Log in a user by sending a POST request to the backend.
export async function login(username: string, password: string) : Promise<void> {
  await axios.post(`${BASE_URL}/user/login`, {username: username, password: password});
}
