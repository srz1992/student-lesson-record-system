import React from 'react';
import {connect} from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { BOOKING_ACTIONS } from '../../redux/actions/bookingActions';
import { PERSON_ACTIONS } from '../../redux/actions/personActions';
import { LESSON_ACTIONS } from '../../redux/actions/lessonActions';
import LessonRecord from '../Teacher/SearchStudents/LessonRecord';

const mapStateToProps = state => ({
    user: state.user,
    student: state.person,
    booking: state.booking
  });

class FailureSnackbar extends React.Component {
  state = {
    open: true,
  };

  messages = ()=>{
    switch(this.props.reducerName){
        case "booking":
            console.log('Booking failed!');  
            return 'Booking failed: please make sure all inputs are filled in'            
        case "person":
            console.log(`Couldn't fetch profile`);
            return 'Could not get profile. Please try again.'
        case "lesson":
            console.log(`couldn't fetch lessons`);
            return 'Could not fetch lessons. Make sure you entered a valid student ID.'
            
    }}

  handleClick = () => {
    this.setState({ open: true });
  };    

  handleClose = (event, reason) => {
    
    this.setState({ open: false });
    let action;
    switch(this.props.reducerName){
        case "booking":
            action = {type: BOOKING_ACTIONS.BOOKING_RESET};
            this.props.dispatch(action);
            break
        case "person":
            action = {type: PERSON_ACTIONS.TEACHER_RESET};
            this.props.dispatch(action);
            action = {type: PERSON_ACTIONS.STUDENT_RESET};
            this.props.dispatch(action);
            break
        case "lesson":
            action = {type: LESSON_ACTIONS.FETCH_LESSON_RECORD_FAILURE_FALSE}
            this.props.dispatch(action);
            break
        default:
            break
    }
    if (reason === 'clickaway') {
        return;
      }
    return
  };

  render() {
    return (
      <div>
        <Snackbar
        anchorOrigin={{
            vertical:'bottom',
            horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={4500}
        onClose={this.handleClose}
        >
            <SnackbarContent 
            onClose={this.handleClose}
            message={this.messages()}
            aria-describedby="client-snackbar"

            />
        </Snackbar>
        
      </div>
    );
  }
}


export default connect(mapStateToProps)(FailureSnackbar);