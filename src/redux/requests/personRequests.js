import axios from 'axios';

export function callStudent(id) {
  console.log('in callStudent. id is:', id);
  return axios.get(`api/person/student/${id}`)
    .then(response => {
      console.log('response.data:', response.data);
      return response.data})
    .catch((error) => { throw error.response || error; });
}

export function putStudent(student) {
  console.log('in updateStudent with student:', student);
  return axios.put(`api/person/student/${student.user_id}`, student)
}

export function callTeacher(id){
  console.log('in callTeacher. id is:', id);
  return axios.get(`api/person/teacher/${id}`)
    .then(response=>{
      console.log('response.data:', response.data);
      return response.data})
    .catch((error) =>{
      throw error.resposne || error;})
}

export function putTeacher(teacher){
  console.log
}