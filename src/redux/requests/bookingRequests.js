import axios from 'axios';

export function callTeachers() {
  return axios.get(`api/booking/teachers`)
    .then(response => {
      console.log('response.data:', response.data);
      return response.data})
    .catch((error) => { throw error.response || error; });
}

