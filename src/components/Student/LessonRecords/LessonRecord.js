import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { LESSON_ACTIONS } from '../../../redux/actions/lessonActions';

const mapStateToProps = state => ({
  user: state.user,
  student: state.person,
  lessons: state.lessons,
  targetLesson: state.lessons.lessons.targetLesson
});

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class LessonRecord extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      targetStudent: null,
      vocabToSubmit: '',
      phraseToSubmit: ''
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

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }
  
  render() {
    let content = null;
    const {classes} = this.props

    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
        <div>
          <Paper>
              <h1>Lesson Record</h1>
              <p>{this.props.student.studentProfile.name} with {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p>
              {/* <p>{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p> */}
              <p>Date: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].date.split('T')[0]}</p>
              <p>Time: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].time}</p>
              <p>Strengths: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths}</p>
              <p>Points of Improvement: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement}</p>
              <p>Vocabulary:{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab.map( (word,i) => <span key={i}>{i+1}. {word}&emsp;</span>)}</p>
              <div>Phrases: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases.map( (phrase, i) =><p key={i}>{i+1}. {phrase}</p> )}</div>
              <p>Comments: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments}</p>
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
export default compose(connect(mapStateToProps),withStyles(styles))(LessonRecord);