import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import StudentNav from '../../Nav/StudentNav';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {BOOKING_ACTIONS} from '../../../redux/actions/bookingActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem'


const mapStateToProps = state => ({
  user: state.user,
  booking: state.booking
});

class BookLesson extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        booking: {
            student_id: '',
            teacher_id: '',
            date_made: '',
            requested_lesson_date: '',
            requested_lesson_time: '',
            status: '',
        },
        teacherList: []
    }
  }

  componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }    
    this.getTeacherList();    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getTeacherList = () => {
      const action = {type: BOOKING_ACTIONS.FETCH_TEACHER_LIST};
      this.props.dispatch(action);
  }

  handleInputChangeFor = propName => (event) => {
       this.setState({
          ...this.state,
          booking: {
              ...this.state.booking,
              [propName]: event.target.value}
        })
  }

  render() {
    let content = null;
    
    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
        <div>
        <h1>Book Students</h1>
        <Paper>
            <h3>Please enter your desired date, time, and teacher</h3>
            <div><label>Date:&emsp;
            <TextField 
            type="date"
            onChange={this.handleInputChangeFor('requested_lesson_date')}
            /></label></div>
            <div><label>Teacher:&emsp;<TextField
                select
                className="teacherList"
                label="Select Teacher"
                onChange={this.handleInputChangeFor('teacher_id')}
                margin="normal"
            >
          {this.props.booking.teacherList.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField></label></div>
        <pre>{JSON.stringify(this.props.booking.teacherList)}</pre>
        </Paper>
        </div>
      );
    }

    return (
      <div>
        <StudentNav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(BookLesson);