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
  .then((response)=>{
    console.log('posted booking in sendBooking');
  })
  .catch((error)=>{
    console.log('error posting booking in sendBooking:', error); 
  })
}

export function callBookings(teacher_id){
  console.log('in callBookings');
  return axios.get(`api/booking/${teacher_id}`)
  .then((response)=>{
    console.log('response.data:', response.data);
    return response.data
  })
  .catch((error)=>{
    throw error.response || error;
  });
}

export function putAcceptBooking(booking_id){
  console.log('in putAcceptBooking with booking id:', booking_id);
  return axios.put(`api/booking/accept/${booking_id}`)
  .then((response)=>{
    console.log('response.data:', response.data);
    return response.data
  })
  .catch((error)=>{
    throw error.response || error;
  })
}

export function putRejectBooking(booking_id){
  console.log('in putRejectBooking with booking id;', booking_id);
  return axios.put(`api/booking/reject/${booking_id}`)
  .then((response)=>{
    console.log('response.data:', response.data);
    return response.data;
  })
  .catch((error)=>{
    throw error.response || error;
  })
}