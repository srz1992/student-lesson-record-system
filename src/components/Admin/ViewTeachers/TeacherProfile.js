import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

class TeacherProfile extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      profileHidden: false,
      editHidden: true,
      teacherToUpdate: {
        id: this.props.teacher.teacherProfile.id,
        name: this.props.teacher.teacherProfile.name,
        date_of_birth: this.props.teacher.teacherProfile.date_of_birth,
        hometown: this.props.teacher.teacherProfile.hometown,
        hobbies: this.props.teacher.teacherProfile.hobbies,
        notes: this.props.teacher.teacherProfile.notes
      }
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

  editTeacher = () =>{
    
    let action = {type: PERSON_ACTIONS.TEACHER, payload: this.props.teacher.teacherProfile}
    this.setState({...this.state, 
      profileHidden: true,
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


  updateTeacherById = (teacher) => {
    this.setState({...this.state, editHidden: true, profileHidden: false})
    let action = { type: PERSON_ACTIONS.UPDATE_TEACHER, payload: teacher };
    console.log(action);
    this.props.dispatch(action);
    this.props.getTeacherById(this.props.targetTeacher);
  }


  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.userType === 'admin') {
      content = (
          <div>
          {!this.state.profileHidden && <Paper>
            <h1>Teacher Profile</h1>
            <pre>{JSON.stringify(this.props.teacher)}</pre>
            <p>ID: {this.props.teacher.teacherProfile.id}</p>
            <p>Name: {this.props.teacher.teacherProfile.name}</p>
            <p>Date of Birth: {this.props.teacher.teacherProfile.date_of_birth}</p>
            <p>Hometown: {this.props.teacher.teacherProfile.hometown}</p>
            <p>Hobbies: {this.props.teacher.teacherProfile.hobbies}</p>
            <p>Notes: {this.props.teacher.teacherProfile.notes}</p>
            <Button onClick={()=>this.editTeacher()}>Edit</Button>
          </Paper>}

          {!this.state.editHidden && <Paper>
              <div><label>ID: &emsp;{this.props.teacher.teacherProfile.id}</label></div>
              <div><label>Name: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('name')} defaultValue={this.props.teacher.teacherProfile.name} /></label></div>
              <div><label>Date of Birth: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('date_of_birth')} type="date" defaultValue={this.props.teacher.teacherProfile.date_of_birth.split('T')[0]} /></label></div>
              <div><label>Hometown: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hometown')} defaultValue={this.props.teacher.teacherProfile.hometown} /></label></div>
              <div><label>Hobbies: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hobbies')} multiline rowsMax="2" defaultValue={this.props.teacher.teacherProfile.hobbies} /></label></div>
              <div><label>Notes: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('notes')} multiline rowsMax="4" defaultValue={this.props.teacher.teacherProfile.notes} /></label></div>

              <Button onClick={()=>{this.updateTeacherById(this.state.teacherToUpdate);}}>Update</Button>
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