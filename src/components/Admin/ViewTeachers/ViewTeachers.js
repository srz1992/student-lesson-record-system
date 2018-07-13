import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AdminNav from '../../Nav/AdminNav';
import UpdateTeacher from './UpdateTeacher'
import TeacherProfile from './TeacherProfile'

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
  user: state.user,
  teacher: state.person
});

class ViewTeachers extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      targetTeacher: null,
      editHidden: true,
      
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
      teacherToUpdate: {
        ...this.state.teacherToUpdate,
        [propName]: event.target.value}
    })    
    console.log(this.state);
    
  }

  getTeacherById = (id) =>{
    this.setState({...this.state, teacherCalled: true, editHidden: true});
    let action = { type: PERSON_ACTIONS.FETCH_TEACHER, payload: id };
    this.props.dispatch(action);
  }


  editTeacher = () =>{
    
    let action = {type: PERSON_ACTIONS.UPDATE_TEACHER_CALLED, payload: this.props.Teacher.TeacherProfile}
    this.setState({...this.state, 
      editHidden: false,
      teacherToUpdate: {
        id: this.props.teacher.teacherProfile.id,
        name: this.props.teacher.teacherProfile.name,
        date_of_birth: this.props.teacher.teacherProfile.date_of_birth,
        hometown: this.props.teacher.teacherProfile.hometown,
        hobbies: this.props.teacher.teacherProfile.hobbies,
        notes: this.props.teacher.teacherProfile.notes
      }})
      this.props.dispatch(action);
      console.log(this.state.teacherToUpdate);
      
  }

  toggleEditHiddenTrue = () =>{
    this.setState({...this.state, 
      editHidden: true,
      });
      this.getTeacherById(this.state.targetTeacher)
      }

  render() {
    let content = null;
    console.log(this.props.teacher);
    
    if (this.props.user.userName && this.props.user.userType === 'admin') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.teacher)}</pre> */}
          <h1 id="welcome">
            View Teachers
          </h1>
          <label>Teacher ID:&emsp;<TextField onChange={this.handleInputChangeFor('targetTeacher')} /></label>
          <Button onClick={()=>this.getTeacherById(this.state.targetTeacher)}>Search</Button>
          {this.props.teacher.teacherProfile.teacherCalled && <TeacherProfile editTeacher={this.editTeacher} />}
          {!this.state.editHidden && <UpdateTeacher toggleEditHiddenTrue={this.toggleEditHiddenTrue} />}
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