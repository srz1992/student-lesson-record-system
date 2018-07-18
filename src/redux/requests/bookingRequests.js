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

// sends a booking request for student?
export function sendBooking(booking){
  console.log('in sendBooking with:', booking);
  return axios.post('api/booking/', booking)
  .then((response)=>{
    console.log('posted booking in sendBooking:', response);
  })
  .catch((error)=>{
    console.log('error posting booking in sendBooking:', error); 
  })
}

// this function is for getting the pending bookings only
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

// this function is for getting the accepted bookings only
export function callAcceptedBookings(teacher_id){
  console.log('in callAcceptedBookings');
  return axios.get(`api/booking/accepted/${teacher_id}`)
  .then((response)=>{
    console.log('response.data:', response.data);
    return response.data
  })
  .catch((error)=>{
    throw error.response || error
  })
}

// accept a booking request for teacher
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

// reject a booking request for teacher
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

// get bookings list for student
export function callStudentBookings(student_id){
  console.log('in callStudentBookings with student_id:', student_id);
  return axios.get(`api/booking/student/bookings/${student_id}`)
  .then((response)=>{
    return response.data;
  })
  .catch((error)=>{
    throw error.response || error
  })
  
}