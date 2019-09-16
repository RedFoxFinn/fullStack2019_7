import axios from 'axios';

const baseUrl = 'http://localhost:3003/api';
const loginUrl = `${baseUrl}/login`;

async function logIn(credentials) {
  return await axios.post(loginUrl, credentials);
}

export default logIn;