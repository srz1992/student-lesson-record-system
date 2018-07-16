import { combineReducers } from 'redux';
import { LESSON_ACTIONS } from '../actions/lessonActions';

const lessons = (state = {student_id: '', lessonRecords:[], recordsObtained: false, errorDisplay: false}, action) => {
  switch (action.type) {
    case LESSON_ACTIONS.SET_LESSON_RECORDS:
        if (action.lessons.length > 0 && action.lessons[0].teacher_name){
                console.log('setting lessonRecords:', action.lessons);
        return {...state, lessonRecords: action.lessons, recordsObtained:true}
        }
        else{
        console.log('got back no lessons!');
        return {...state, lessonRecords: action.lessons, recordsObtained:false, errorDisplay: true}
        }
    default:
      return state;
  }
};

const blah = (state = {}, action)=>{
    return state;
}

export default combineReducers({
  lessons,
  blah
});