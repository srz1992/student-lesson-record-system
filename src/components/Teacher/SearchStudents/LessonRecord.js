import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import AdminNav from '../../Nav/AdminNav';
import StudentProfile from './StudentProfile'

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
  user: state.user,
  student: state.person,
  lessons: state.lessons.lessons,
});

class LessonRecord extends Component {
  
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

  getStudentById = (id) =>{
    this.setState({...this.state, studentCalled: true});
    let action = { type: PERSON_ACTIONS.FETCH_STUDENT, payload: id };
    this.props.dispatch(action);
  }


  

  

  render() {
    let content = null;
    console.log(this.props.student);
    
    if (this.props.user.userName && this.props.user.userType === 'teacher') {
      content = (
        <div>
          <Paper>
              <h1>Lesson Record</h1>
              <p>{this.props.lessons.lessonRecord[this.props.targetLesson]}</p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
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
export default connect(mapStateToProps)(LessonRecord);