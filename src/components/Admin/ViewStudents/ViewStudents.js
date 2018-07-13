import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AdminNav from '../../Nav/AdminNav';
import UpdateStudent from './UpdateStudent'
import StudentProfile from './StudentProfile'

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

class ViewTeachers extends Component {
  
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
    
    if (this.props.user.userName && this.props.user.userType === 'admin') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
          <h1 id="welcome">
            View Students
          </h1>
          <label>Student ID:&emsp;<TextField onChange={this.handleInputChangeFor('targetStudent')} /></label>
          <Button onClick={()=>this.getStudentById(this.state.targetStudent)}>Search</Button>
          {this.props.student.studentProfile.studentCalled && <StudentProfile getStudentById={this.getStudentById} targetStudent={this.state.targetStudent} editStudent={this.editStudent} />}
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
export default connect(mapStateToProps)(ViewTeachers);