import axios from 'axios';

export function callTeachers() {
  return axios.get(`api/booking/teachers`)
    .then(response => {
      return response.data})
    .catch((error) => { throw error.response || error; });
}

export function callStudent(user_id) {
  console.log('callStudent user_id:', user_id);
  
  return axios.get(`api/booking/student/${user_id}`)
  .then(response => {
    console.log('response.data:', response.data);
    return response.data
  })
  .catch((error)=>{
    throw error.response || error;
  })
}

export function callTeacherId(user_id){
  console.log('in callTeacherId with:', user_id);
  return axios.get(`api/booking/teacher/${user_id}`)
  .then(response =>{
    console.log('response.data:', response.data);
    return response.data
  })
  .catch((error)=>{
    throw error.response || error;
  })
}

export function sendBooking(booking){
  console.log('in sendBooking with:', booking);
  return axios.post('api/booking/', booking)
}
