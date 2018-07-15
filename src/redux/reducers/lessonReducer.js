import { combineReducers } from 'redux';
import { LESSON_ACTIONS } from '../actions/lessonActions';

const lessons = (state = {student_id: '', lessonRecords:[]}, action) => {
  switch (action.type) {
    case LESSON_ACTIONS.SET_LESSON_RECORDS:
        console.log('setting lessonRecords:', action.lessons);
        return {...state, lessonRecords: action.lessons}
    default:
      return state;
  }
};



export default combineReducers({
  lessons
});