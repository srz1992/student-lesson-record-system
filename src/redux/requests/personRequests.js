import axios from 'axios';

export function callStudent(id) {
  console.log('in callStudent. id is:', id);
  
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get(`api/person/student/${id}`)
    .then(response => {
      console.log('response.data:', response.data);
      return response.data})
    .catch((error) => { throw error.response || error; });
}


export function placeholder() {
  console.log('hi');
}
