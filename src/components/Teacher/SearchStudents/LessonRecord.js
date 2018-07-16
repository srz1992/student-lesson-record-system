import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

import './LessonRecord.css'

// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import { LESSON_ACTIONS } from '../../../redux/actions/lessonActions';

const mapStateToProps = state => ({
  user: state.user,
  student: state.person,
  lessons: state.lessons
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
      editHidden: true,
      recordToEdit: {
          strengths: '',
          points_of_improvement: '',
          vocab: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab,
          phrases: [],
          comments: ''
      },
      vocabToSend: '',
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

  toggleEdit = () =>{
      this.setState({...this.state, editHidden: false});
  }
  
  handleVocabDelete = (word, newVocab) => {
    console.log('handleVocabDelete');
    
    // const chipData = [...this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab];
    // const chipToDelete = chipData.indexOf(word);
    // chipData.splice(chipToDelete, 1);
    // return {chipData};
    // const action = {type: LESSON_ACTIONS.SET_LESSON_VOCAB, payload: newVocab}

  }

  handleVocabSubmit = (newVocab) =>{
    const action = {type: LESSON_ACTIONS.SET_LESSON_VOCAB, payload: newVocab}
  }

  handleVocabToSend = (event)=>{
    this.setState({
      ...this.state,
      vocabToSend: event.target.value
    })    
  }
  

  render() {
    let content = null;
    const {classes} = this.props

    if (this.props.user.userName && this.props.user.userType === 'teacher') {
      content = (
        <div>
          {this.state.editHidden && <Paper>
              <h1>Lesson Record</h1>
              <p>Sean with {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p>
              <p>{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p>
              <p>Date: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].date.split('T')[0]}</p>
              <p>Time: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].time}</p>
              <p>Strengths: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths}</p>
              <p>Points of Improvement: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement}</p>
              <p>Vocabulary:{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab}</p>
              <p>Phrases: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases}</p>
              <p>Comments: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments}</p>
              <Button onClick={()=>this.toggleEdit()}>Edit</Button>
          </Paper>}
          {!this.state.editHidden && <Paper>
            <p>Sean with {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p>
              <p>{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p>
              <p>Date: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].date.split('T')[0]}</p>
              <p>Time: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].time}</p>
              <div><label>Strengths: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('strengths')} defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths} /></label></div>
              <div><label>Points of Improvement: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('points_of_improvement')} defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement} /></label></div>
              <div><label>Vocabulary: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('vocab')} defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocabulary} /></label></div>
              {/* <div><label>Phrases: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('phrases')} defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases} /></label></div> */}
              <div><label>Comments: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('comments')} multiline rowsMax="2" defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments} /></label></div>

            
            <FormControl onSubmit={()=>this.handleVocabSubmit(this.state.vocabToSend)} className="">
            {this.state.recordToEdit.vocab.map(word => <Chip key={word} label={word} className={classes.chip} onDelete={()=>this.handleVocabDelete(word,this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab)} />)}
            <TextField onChange={this.handleVocabToSend} /></FormControl>

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
export default compose(connect(mapStateToProps),withStyles(styles))(LessonRecord);