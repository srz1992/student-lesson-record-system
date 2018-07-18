import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';


import StudentNav from '../../Nav/StudentNav';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {BOOKING_ACTIONS} from '../../../redux/actions/bookingActions';

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

const todaysDate = () =>{
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + '-' + m + '-' + d;
    return yyyymmdd;
}

class BookLesson extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        booking: {
            student_id: '',
            teacher_id: '',
            date_made: todaysDate(),
            requested_lesson_date: '',
            requested_lesson_time: '',
            status: 'Pending',
        },
        teacherList: []
    }
  }

    componentDidMount = async() => {
        console.log('do I need this if statement?:', this.props.user);
        
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            await this.fetchUser();
        }
        
          await this.getTeacherList();
        //   await this.getStudentProfileId(this.props.user.userId)
        
  }

  fetchUser = () => {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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
              student_id: this.props.user.secondId,
              [propName]: event.target.value}
        })
  }

//   getStudentProfileId = (user_id) => {
//     console.log('user_id:', user_id);
//     const action = {type:BOOKING_ACTIONS.FETCH_STUDENT_ID, payload: user_id}
//     this.props.dispatch(action);
//     return
//   }

  postBookingRequest = (booking) =>{
    console.log('in postBookingRequest with booking:', booking);
    const action = {type: BOOKING_ACTIONS.POST_BOOKING, payload: booking}
    this.props.dispatch(action);

  }

  render() {
    let content = null;
    const {classes} = this.props;

    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
        <div>
        <h1>Book a Lesson</h1>
        <Paper>
            <h3>Please enter your desired date, time, and teacher</h3>
            <div><label>Teacher:&emsp;<Select
                
                className={classes.textField}
                label="Select Teacher"
                name='teacher_id'
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
                type="time"
                defaultValue="08:00"
                onChange={this.handleInputChangeFor('requested_lesson_time')}
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                min: "8:00",
                max: "21:00"
                }}
                inputProps={{
                step: 300, // 5 min
                }}/>
            </label>
        </div>
        <div>
        </div>
        <Button onClick={()=>this.postBookingRequest(this.state.booking)}>Submit</Button>

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