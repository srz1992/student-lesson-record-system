import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
  user: state.user,
  student: state.person
});


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    profile: {
        width: 350,
        height: "auto",
        textAlign: "center",
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
class StudentProfile extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      
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


  


  render() {
    let content = null;
    const {classes} = this.props;
    if (this.props.user.userName && this.props.user.userType === 'teacher') {
      content = (
          <div>
          <Paper className={classes.profile}>
            <h1>Student Profile</h1>
            {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
            <p>ID: {this.props.student.studentProfile.id}</p>
            <p>Name: {this.props.student.studentProfile.name}</p>
            <p>Date of Birth: {this.props.student.studentProfile.date_of_birth.split('T')[0]}</p>
            <p>Hometown: {this.props.student.studentProfile.hometown}</p>
            <p>Hobbies: {this.props.student.studentProfile.hobbies}</p>
            <p>Notes: {this.props.student.studentProfile.notes}</p>
          </Paper>
            </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default compose(connect(mapStateToProps),withStyles(styles))(StudentProfile);