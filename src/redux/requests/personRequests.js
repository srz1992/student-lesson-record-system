import axios from 'axios';

export function callStudent(id) {
  console.log('in callStudent. id is:', id);
  return axios.get(`api/person/student/${id}`)
    .then(response => {
      console.log('response.data:', response.data);
      return response.data})
}

export function putStudent(student) {
  console.log('in putStudent with student:', student);
  return axios.put(`api/person/student/${student.user_id}`, student)
}

export function callTeacher(id){
  console.log('in callTeacher. id is:', id);
  return axios.get(`api/person/teacher/${id}`)
    .then(response=>{
      console.log('response.data:', response.data);
      return response.data})
}

export function putTeacher(teacher){
  console.log('in putTeacher with teacher:', teacher);
  return axios.put(`api/person/teacher/${teacher.user_id}`, teacher)
  .then((response)=>{
    console.log('successfully putTeacher:', response);    
  })
  .catch((error)=>{
    throw error.response || error})
}