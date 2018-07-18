import React, { Component } from 'react';
import { connect } from 'react-redux';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
  teacher: state.person
});

class TeacherProfile extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      profileHidden: false,      
    }
  }
  componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }    
    console.log('this.state.teacherToUpdate:', this.state.teacherToUpdate);
    
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

  handleUpdateInputChangeFor = propName => (event) => {
    this.setState({
      ...this.state,
      teacherToUpdate: {
        ...this.state.teacherToUpdate,
        [propName]: event.target.value}
    })    
    console.log(this.state);
    
  }


  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
          <div>
          {!this.state.profileHidden && <Paper>
            <h1>Teacher Profile</h1>
            {/* <pre>{JSON.stringify(this.props.teacher)}</pre> */}
            <p>Name: {this.props.teacher.teacherProfile.name}</p>
            <p>Date of Birth: {this.props.teacher.teacherProfile.date_of_birth.split('T')[0]}</p>
            <p>Hometown: {this.props.teacher.teacherProfile.hometown}</p>
            <p>Hobbies: {this.props.teacher.teacherProfile.hobbies}</p>
          </Paper>}

          
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
export default connect(mapStateToProps)(TeacherProfile);