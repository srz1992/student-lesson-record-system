import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';


import StudentNav from '../../Nav/StudentNav';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {BOOKING_ACTIONS} from '../../../redux/actions/bookingActions';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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


class BookedLessons extends Component {
  
  constructor(props){
    super(props);
    this.state = {
       
    }
  }

    componentDidMount = async() => {        
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            await this.fetchUser();
            await new Promise(resolve=>{setTimeout(resolve, 100)})
        }
        this.fetchStudentBookings();
  }

  fetchUser = () => {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  fetchStudentBookings = () => {
    const action = {type: BOOKING_ACTIONS.FETCH_STUDENT_BOOKINGS_LIST, payload: this.props.user.secondId}
    this.props.dispatch(action);

  }
  

  render() {
    let content = null;
    const {classes} = this.props;

    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
        <div>
        <h1>Booked Lessons</h1>
        <Paper>
        <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>Teacher Name</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Lesson Date</TableCell>
                          <TableCell>Lesson Time</TableCell>
                          
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.booking.booking.bookingList.map(booking => (
                    <TableRow key={booking.id}>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.date_made.split('T')[0]}</TableCell>
                        <TableCell>{booking.requested_lesson_date.split('T')[0]}</TableCell>
                        <TableCell>{booking.requested_lesson_time}</TableCell>
                    </TableRow>))}
                    {this.props.booking.booking.bookingList.length===0 && 
                    <TableRow >
                    <TableCell> You have no bookings</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                </TableRow>}
                  </TableBody>
              </Table>
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

export default compose(connect(mapStateToProps),withStyles(styles))(BookedLessons);