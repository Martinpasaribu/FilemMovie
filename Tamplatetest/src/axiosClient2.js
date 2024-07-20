import axios from 'axios'

const axiosClient2 = axios.create({
  baseURL: 'http://localhost:5000', withCredentials: true
});

export default axiosClient2


// const instance = axios.create({
//   baseURL: 'www.themealdb.com/api/json/v1/1',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });