import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';


import StudentNav from '../../Nav/StudentNav';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {BOOKING_ACTIONS} from '../../../redux/actions/bookingActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select';


const mapStateToProps = state => ({
  user: state.user,
  booking: state.booking
});

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
        width: 200,
      },
  });

class BookLesson extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        booking: {
            student_id: '',
            teacher_id: '',
            date_made: Date(),
            requested_lesson_date: '',
            requested_lesson_time: '',
            status: 'Pending',
        },
        teacherList: []
    }
  }

  componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }    
    this.getTeacherList();
    this.getStudentProfileId(this.props.user.userId)    
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

  getStudentProfileId = (user_id) => {
    console.log('user_id:', user_id);
    
    const action = {type:BOOKING_ACTIONS.FETCH_STUDENT_ID, user_id}
    this.props.dispatch(action);
  }

  render() {
    let content = null;
    const {classes} = this.props;

    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
        <div>
        <h1>Book Students</h1>
        <Paper>
            <h3>Please enter your desired date, time, and teacher</h3>
            <div><label>Teacher:&emsp;<Select
                select
                className={classes.textField}
                label="Select Teacher"
                onChange={this.handleInputChangeFor('teacher_id')}
                value={this.state.booking.teacher_id}
                
            >
          {this.props.booking.teacherList.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select></label></div>
        <div>
            <label>Date:&emsp;<TextField 
            type="date"
            onChange={this.handleInputChangeFor('requested_lesson_date')}
            /></label></div>
        <div>
            <label>Time:&emsp;
            <TextField
                id="time"
                label="Alarm clock"
                type="time"
                defaultValue="07:30"
                onChange={this.handleInputChangeFor('requested_lesson_time')}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
                }}/>
            </label>
        </div>
        <pre>reducer:{JSON.stringify(this.props.booking.teacherList)}</pre>
        <pre>state:{JSON.stringify(this.state)}</pre>
        <pre>user:{JSON.stringify(this.props.user)}</pre>

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

export default compose(connect(mapStateToProps),withStyles(styles))(BookLesson);