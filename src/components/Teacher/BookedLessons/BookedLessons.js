import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import TeacherNav from '../../Nav/TeacherNav';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { BOOKING_ACTIONS } from '../../../redux/actions/bookingActions';


const mapStateToProps = state => ({
  user: state.user,
  student: state.person,
  booking: state.booking
});

class BookedLessons extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  
  async componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      const fetchedUser = this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
      console.log(`fetchedUser:${fetchedUser}`);
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        await new Promise(resolve=>{setTimeout(resolve, 150)})
    }    
    console.log('this.state.studentToUpdate:', this.state.studentToUpdate);
    const action = {type: BOOKING_ACTIONS.FETCH_BOOKINGS_LIST, payload: this.props.user.secondId}
    
    this.props.dispatch(action);
    // await this.getBookings(this.props.user.secondId);
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  handleInputChangeFor = propName => (event) => {
    this.setState({
      ...this.state,
      [propName]: event.target.value
    })    
    console.log(this.state);
    
  }

  handleUpdateInputChangeFor = propName => (event) => {
    this.setState({
      ...this.state,
      studentToUpdate: {
        [propName]: event.target.value}
    })    
    console.log(this.state);
    
  }

  getTeacherById = (user_id) => {
    console.log('in getTeacherById with user_id:', user_id); 
    const action = {type: BOOKING_ACTIONS.FETCH_TEACHER_ID, payload: user_id}
    this.props.dispatch(action);
  }

  getBookings = (teacher_id) =>{
    const action = {type: BOOKING_ACTIONS.FETCH_BOOKINGS_REQUEST_LIST, payload: teacher_id}
    return this.props.dispatch(action);
  }

  acceptBooking = (booking_id, teacher_id) => {
    // TO DO: UPON SUCCESSFULLY UPDATING WE NEED TO REFRESH REDUX BOOKING REQUEST LIST
    console.log('acceptBooking id:', booking_id);
    const action = {type:BOOKING_ACTIONS.UPDATE_BOOKING_ACCEPT, payload: {booking_id:booking_id, teacher_id:teacher_id}}
    this.props.dispatch(action);
  }

  rejectBooking = (booking_id, teacher_id) => {
    console.log('acceptBooking id:', booking_id);
    const action = {type:BOOKING_ACTIONS.UPDATE_BOOKING_REJECT, payload: {booking_id:booking_id, teacher_id:teacher_id}}
    this.props.dispatch(action);
  }
  

  render() {
    let content = null;
    console.log(this.props.student);
    
    if (this.props.user.userName && this.props.user.userType === 'teacher') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
          <h1 id="welcome">
            Bookings
          </h1>
          <Paper>
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>Student ID</TableCell>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Requested Lesson Date</TableCell>
                          <TableCell>Requested Lesson Time</TableCell>
                          
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.booking.booking.bookingList.map(request => (
                    <TableRow key={request.id}>
                        <TableCell>{request.student_id}</TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{request.date_made.split('T')[0]}</TableCell>
                        <TableCell>{request.requested_lesson_date.split('T')[0]}</TableCell>
                        <TableCell>{request.requested_lesson_time}</TableCell>
                        

                    </TableRow>))}
                  </TableBody>
              </Table>
              <pre>{JSON.stringify(this.props.user)}</pre>
              <pre>{JSON.stringify(this.props.booking)}</pre>
          </Paper>

        </div>
      );
    }

    return (
      <div>
        <TeacherNav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(BookedLessons);