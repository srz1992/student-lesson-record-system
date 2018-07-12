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

class UpdateStudent extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      targetStudent: null,
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

  getStudentById = (id) =>{
    this.setState({...this.state, studentCalled: true});
    let action = { type: PERSON_ACTIONS.FETCH_STUDENT, payload: id };
    this.props.dispatch(action);
  }

  updateStudentById = (student) => {
    this.setState({...this.state, editHidden: false})
    let action = { type: PERSON_ACTIONS.UPDATE_STUDENT, payload: student };
    console.log(action);
    this.props.dispatch(action);
  }

  editStudent = () =>{
    this.setState({...this.state, 
      editHidden: false,
      studentToUpdate: {
        id: this.props.student.studentProfile.id,
        name: this.props.student.studentProfile.name,
        date_of_birth: this.props.student.studentProfile.date_of_birth,
        hometown: this.props.student.studentProfile.hometown,
        hobbies: this.props.student.studentProfile.hobbies,
        notes: this.props.student.studentProfile.notes
      }})
  }

  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.userType === 'admin') {
      content = (
          <div>
          <h1 id="welcome">
            Update Student
          </h1>
          <Paper>
              <div><label>ID: &emsp;{this.props.student.studentProfile.id}</label></div>
              <div><label>Name: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('name')} defaultValue={this.props.student.studentProfile.name} /></label></div>
              <div><label>Date of Birth: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('date_of_birth')} type="date" defaultValue={Date(Date.parse(this.props.student.studentProfile.date_of_birth))} /></label></div>
              <div><label>Hometown: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hometown')} defaultValue={this.props.student.studentProfile.hometown} /></label></div>
              <div><label>Hobbies: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hobbies')} multiline rowsMax="2" defaultValue={this.props.student.studentProfile.hobbies} /></label></div>
              <div><label>Notes: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('notes')} multiline rowsMax="4" defaultValue={this.props.student.studentProfile.notes} /></label></div>

              <Button onClick={()=>this.updateStudentById(this.state.studentToUpdate)}>Update</Button>
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
export default connect(mapStateToProps)(UpdateStudent);