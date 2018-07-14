import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import AdminNav from '../../Nav/AdminNav';

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


const mapStateToProps = state => ({
  user: state.user,
  student: state.person
});

class BookingRequests extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      targetStudent: null,
      editHidden: true,
      
    }
  }
  
  componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }    
    console.log('this.state.studentToUpdate:', this.state.studentToUpdate);
    
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
        ...this.state.studentToUpdate,
        [propName]: event.target.value}
    })    
    console.log(this.state);
    
  }

  getTeacherById = (user_id) => {

  }

  getBookings = (teacher_id) =>{

  }

  

  

  render() {
    let content = null;
    console.log(this.props.student);
    
    if (this.props.user.userName && this.props.user.userType === 'teacher') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
          <h1 id="welcome">
            Booking Requests
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
                          <TableCell>Accept</TableCell>
                          <TableCell>Reject</TableCell>
                      </TableRow>
                  </TableHead>
              </Table>
          </Paper>

        </div>
      );
    }

    return (
      <div>
        <AdminNav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(BookingRequests);