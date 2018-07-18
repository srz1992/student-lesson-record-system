import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';



import TeacherNav from '../../Nav/TeacherNav';
import StudentProfile from './StudentProfile'

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import {LESSON_ACTIONS} from '../../../redux/actions/lessonActions';

// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LessonRecord from './LessonRecord';

const mapStateToProps = state => ({
  user: state.user,
  student: state.person,
  lessons: state.lessons.lessons,
});



class SearchStudents extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      targetStudent: null,
      targetLesson: 0,
      studentCalled: false,
      searchClicked: false
    }

  }
  
  componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }    
    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleInputChangeFor = propName => (event) => {
    this.setState({
      ...this.state,
      [propName]: parseInt(event.target.value)
    })    
    console.log(this.state);
    
  }

  getStudentById = (id) =>{
    this.setState({...this.state, studentCalled: true, searchClicked: true});
    let action = { type: PERSON_ACTIONS.FETCH_STUDENT, payload: id };
    this.props.dispatch(action);
  }

  getStudentRecordsById = (id)=>{
      let action = {type: LESSON_ACTIONS.FETCH_LESSON_RECORDS, payload: id}
      this.props.dispatch(action);
  }

  getProfileAndRecords = (id)=>{
    console.log('in getProfileAndRecords with id:', id);
    const action = {type: LESSON_ACTIONS.SET_TARGET_LESSON, payload: 0};
    this.props.dispatch(action);
    this.getStudentById(id);
    this.getStudentRecordsById(id);
  }
  
changeTargetLesson = (newIndex)=>{
  console.log('in changeTargetLesson with newIndex:', newIndex);
  const action = {type:LESSON_ACTIONS.SET_TARGET_LESSON, payload: newIndex}
  this.props.dispatch(action);
  
}
  

  render() {
    let content = null;
    console.log(this.props.student);
    const {classes} = this.props;

    if (this.props.user.userName && this.props.user.userType === 'teacher') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
          <h1 id="welcome">
            Search Students
          </h1>
          <label>Student ID:&emsp;<TextField type="number" onChange={this.handleInputChangeFor('targetStudent')} /></label>
          <Button onClick={()=>this.getProfileAndRecords(this.state.targetStudent)}>Search</Button>
          {this.props.student.studentProfile.studentCalled && <StudentProfile targetStudent={this.state.targetStudent}/>}
          {this.props.student.studentProfile.studentCalled && this.props.lessons.lessonRecords.map((number,i) => <span key={i}><button onClick={()=>this.changeTargetLesson(i)}>{this.props.lessons.lessonRecords.length-i}</button></span>)}
          {this.props.student.studentProfile.studentCalled && this.props.lessons.recordsObtained && <LessonRecord searchClicked={this.state.searchClicked} targetStudent={this.state.targetStudent}/>}
        </div>
      );
    }

    return (
      <div>
        <TeacherNav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SearchStudents);