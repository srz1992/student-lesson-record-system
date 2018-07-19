import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';



import StudentNav from '../../Nav/StudentNav';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import {LESSON_ACTIONS} from '../../../redux/actions/lessonActions';

// import Paper from '@material-ui/core/Paper';
import LessonRecord from './LessonRecord';

const mapStateToProps = state => ({
  user: state.user,
  student: state.person,
  lessons: state.lessons.lessons,
});



class LessonRecords extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      targetStudent: null,
      targetLesson: 0,
      studentCalled: false,
      searchClicked: false
    }

  }
  
  componentDidMount = async () => {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
      await new Promise(resolve=>{setTimeout(resolve, 100)})
    }    
    this.getStudentRecordsById();
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

  getStudentRecordsById = (id)=>{
      let action = {type: LESSON_ACTIONS.FETCH_LESSON_RECORDS, payload: this.props.user.secondId}
      this.props.dispatch(action);
      let secondAction = {type: PERSON_ACTIONS.FETCH_STUDENT, payload: this.props.user.secondId}
      this.props.dispatch(secondAction)
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

    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
          <h1 id="welcome">
            Your Lesson Records
          </h1>
          {this.props.lessons.recordsObtained && this.props.lessons.lessonRecords.map((number,i) => <span key={i}><button onClick={()=>this.changeTargetLesson(i)}>{this.props.lessons.lessonRecords.length-i}</button></span>)}
          {this.props.lessons.recordsObtained && <LessonRecord targetStudent={this.state.targetStudent}/>}
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(LessonRecords);