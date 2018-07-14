import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const userName = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      console.log('action.user:', action.user);
      
      return action.user.username || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const userType = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.type || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const userId = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.id || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const secondId = (state = null, action) => {
  switch (action.type){
    case USER_ACTIONS.SET_USER:
      console.log('action.user check here:',action.user);
      
      if(action.user.student_id){return action.user.student_id || state;}
      else if(action.user.teacher_id){return action.user.teacher_id || state;}
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  userName,
  userType,
  userId,
  secondId,
  isLoading,
});
