import axios from 'axios';

export function callLessons(student_id){
    console.log('in callLessons with student_id:', student_id);
    return axios.get(`/api/lesson/${student_id}`)
    .then((response)=>{
        console.log('got lesson records:', response.data);
        return response.data
    }).catch((error)=>{
        console.log('in callLessons error getting lesson records:', error);
    })
}

export function putLesson(updatedLesson){
    console.log('in putLesson with lesson_id:', updatedLesson);
    const lesson_id = updatedLesson.id;
    return axios.put(`/api/lesson/${lesson_id}`, updatedLesson)
    .then((response)=>{
        console.log('updated lesson record:', response);
        return response.data;
    })
    .catch((error)=>{
        console.log('in putLesson error updating lesson record:', error);
    })
}