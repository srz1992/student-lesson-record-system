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
  student: state.person
});

class StudentProfile extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      profileHidden: false,
      editHidden: true,
      studentToUpdate: {
        id: this.props.student.studentProfile.id,
        name: this.props.student.studentProfile.name,
        date_of_birth: this.props.student.studentProfile.date_of_birth,
        hometown: this.props.student.studentProfile.hometown,
        hobbies: this.props.student.studentProfile.hobbies,
        notes: this.props.student.studentProfile.notes
      }
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

  handleUpdateInputChangeFor = propName => (event) => {
    this.setState({
      ...this.state,
      studentToUpdate: {
        ...this.state.studentToUpdate,
        [propName]: event.target.value}
    })    
    console.log(this.state);
    
  }

  editStudent = () =>{
    
    let action = {type: PERSON_ACTIONS.UPDATE_STUDENT_CALLED, payload: this.props.student.studentProfile}
    this.setState({...this.state, 
      profileHidden: true,
      editHidden: false,
      studentToUpdate: {
        id: this.props.student.studentProfile.id,
        name: this.props.student.studentProfile.name,
        date_of_birth: this.props.student.studentProfile.date_of_birth,
        hometown: this.props.student.studentProfile.hometown,
        hobbies: this.props.student.studentProfile.hobbies,
        notes: this.props.student.studentProfile.notes
      }})
      this.props.dispatch(action);
      console.log(this.state.studentToUpdate);
      
  }


  updateStudentById = (student) => {
    this.setState({...this.state, editHidden: true, profileHidden: false})
    let action = { type: PERSON_ACTIONS.UPDATE_STUDENT, payload: student };
    console.log(action);
    this.props.dispatch(action);
    this.props.getStudentById(this.props.targetStudent);
  }


  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.userType === 'admin') {
      content = (
          <div>
          {!this.state.profileHidden && <Paper>
            <h1>Student Profile</h1>
            {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
            <p>ID: {this.props.student.studentProfile.id}</p>
            <p>Name: {this.props.student.studentProfile.name}</p>
            <p>Date of Birth: {this.props.student.studentProfile.date_of_birth}</p>
            <p>Hometown: {this.props.student.studentProfile.hometown}</p>
            <p>Hobbies: {this.props.student.studentProfile.hobbies}</p>
            <p>Notes: {this.props.student.studentProfile.notes}</p>
            <Button onClick={()=>this.editStudent()}>Edit</Button>
          </Paper>}

          {!this.state.editHidden && <Paper>
              <div><label>ID: &emsp;{this.props.student.studentProfile.id}</label></div>
              <div><label>Name: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('name')} defaultValue={this.props.student.studentProfile.name} /></label></div>
              <div><label>Date of Birth: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('date_of_birth')} type="date" defaultValue={this.props.student.studentProfile.date_of_birth.split('T')[0]} /></label></div>
              <div><label>Hometown: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hometown')} defaultValue={this.props.student.studentProfile.hometown} /></label></div>
              <div><label>Hobbies: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hobbies')} multiline rowsMax="2" defaultValue={this.props.student.studentProfile.hobbies} /></label></div>
              <div><label>Notes: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('notes')} multiline rowsMax="4" defaultValue={this.props.student.studentProfile.notes} /></label></div>

              <Button onClick={()=>{this.updateStudentById(this.state.studentToUpdate);}}>Update</Button>
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
export default connect(mapStateToProps)(StudentProfile);