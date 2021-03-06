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
      editHidden: true,
      recordToEdit: {
          id: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].id,
          student_id: this.props.targetStudent,
          strengths: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths,
          points_of_improvement: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement,
          vocab: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab,
          phrases: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases,
          comments: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments
      },
      vocabToSubmit: '',
      phraseToSubmit: ''
    }
  }
  
  componentDidMount() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }       
    
    this.setState({
      ...this.state,
      editHidden: true,
      recordToEdit: {
        id: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].id,
        student_id: this.props.targetStudent,
        strengths: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths,
        points_of_improvement: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement,
        vocab: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab,
        phrases: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases,
        comments: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments
    }
    }) 
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
        recordToEdit:{
          ...this.state.recordToEdit,
          [propName]: event.target.value}
      }
    )    
    console.log(this.state);
    
  }

  toggleEdit = () =>{
      if(this.state.editHidden){
        this.setState({
        ...this.state, 
        editHidden: false,
        recordToEdit: {
          id: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].id,
          student_id: this.props.targetStudent,
          strengths: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths,
          points_of_improvement: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement,
          vocab: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab,
          phrases: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases,
          comments: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments
      }
      });
      
    }
    else {
      this.setState({
        ...this.state, 
        editHidden: false,
        recordToEdit:{
          recordToEdit: {
            id: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].id,
            student_id: this.props.targetStudent,
            strengths: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths,
            points_of_improvement: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement,
            vocab: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab,
            phrases: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases,
            comments: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments
        }
        }
      });
    }
  }
  
  handleVocabDelete = (word) => {
    console.log('handleVocabDelete. word:', word);
    const action = {type:LESSON_ACTIONS.DELETE_VOCAB, payload: {word: word, targetLesson: this.props.targetLesson }}
    this.props.dispatch(action);

    // this.setState({
    //   ...this.state,
    //   recordToEdit: {
    //     ...this.state.recordToEdit,
    //     vocab: listToSave
    //   }
    // })
  }

  handlePhraseDelete = (phrase) =>{
    console.log('handlePhraseDelete. phrase:', phrase);
    const action = {type:LESSON_ACTIONS.DELETE_PHRASE, payload: {phrase: phrase, targetLesson: this.props.targetLesson}}
    this.props.dispatch(action);
    
  }

  handleVocabSubmit = (vocabToSubmit) =>{
    console.log('in handleVocabSubmit with:', vocabToSubmit);

    const action = {type: LESSON_ACTIONS.ADD_LESSON_VOCAB, payload: {targetLesson: this.props.targetLesson, vocabToSubmit: vocabToSubmit}}
    this.props.dispatch(action)

    this.setState({
      ...this.state,
      vocabToSubmit: ''
    })
  }

  handlePhraseSubmit = (phraseToSubmit)=>{
    console.log('in handlePhraseSubmit with:', phraseToSubmit);

    const action = {type: LESSON_ACTIONS.ADD_LESSON_PHRASE, payload: {targetLesson: this.props.targetLesson, phraseToSubmit: phraseToSubmit}}
    this.props.dispatch(action);

    this.setState({
      ...this.state,
      phraseToSubmit: ''
    })
  }

  handleVocabToSubmit = (event)=>{
    event.preventDefault();
    this.setState({
      ...this.state,
      vocabToSubmit: event.target.value
    })    
  }

  handlePhraseToSubmit = (event)=>{
    event.preventDefault();
    this.setState({
      ...this.state, 
      phraseToSubmit: event.target.value
    })
  }
  
  updateLessonRecord = async () =>{
    await this.setState({
      ...this.state,
      editHidden: true,
      recordToEdit: {
        id: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].id,
        student_id: this.props.targetStudent,
        strengths: this.state.recordToEdit.strengths,
        points_of_improvement: this.state.recordToEdit.points_of_improvement,
        vocab: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab,
        phrases: this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases,
        comments: this.state.recordToEdit.comments
    }
    })
    const action = {type:LESSON_ACTIONS.UPDATE_LESSON_RECORD, payload: this.state.recordToEdit};
    this.props.dispatch(action);
    
  }

  render() {
    let content = null;
    const {classes} = this.props

    if (this.props.user.userName && this.props.user.userType === 'teacher') {
      content = (
        <div>
          {this.state.editHidden && <Paper>
              <h3>{this.props.student.studentProfile.name} with {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</h3>
              {/* <p>{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p> */}
              <p>Date: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].date.split('T')[0]}</p>
              <p>Time: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].time}</p>
              <p>Strengths: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths}</p>
              <p>Points of Improvement: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement}</p>
              <p>Vocabulary:{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab.map( (word,i) => <span key={i}>{i+1}. {word}&emsp;</span>)}</p>
              <label>Phrases: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases.map( (phrase, i) =><p key={i}>{i+1}. {phrase}</p> )}</label>
              <p>Comments: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments}</p>
              <Button onClick={()=>this.toggleEdit()}>Edit</Button>
          </Paper>}
          {!this.state.editHidden && <Paper>
            <p>{this.props.student.studentProfile.name} with {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p>
              <p>{this.props.lessons.lessons.lessonRecords[this.props.targetLesson].teacher_name}</p>
              <p>Date: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].date.split('T')[0]}</p>
              <p>Time: {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].time}</p>
              <div><label>Strengths: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('strengths')} defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].strengths} /></label></div>
              <div><label>Points of Improvement: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('points_of_improvement')} defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].points_of_improvement} /></label></div>
              <div><label>Vocabulary: &emsp;<form onSubmit={()=>this.handleVocabSubmit(this.state.vocabToSubmit)}><FormGroup row className="">
            {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].vocab.map((word,i) => <Chip key={i} label={word} className={classes.chip} onDelete={()=>this.handleVocabDelete(word,this.state.recordToEdit.vocab)} />)}
            <TextField className="editTextField" value={this.state.vocabToSubmit} onChange={this.handleVocabToSubmit} />
            <Button type="submit" value="" >Add</Button>
            </FormGroup></form></label></div>
            <div><label>Phrases: &emsp;<form onSubmit={()=>this.handlePhraseSubmit(this.state.phraseToSubmit)}><FormGroup row className="">
            {this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases.map((phrase,i) => <Chip key={i} label={phrase} className={classes.chip} onDelete={()=>this.handlePhraseDelete(phrase,this.state.recordToEdit.phrases)} />)}
            <TextField className="editTextField" value={this.state.phraseToSubmit} onChange={this.handlePhraseToSubmit} />
            <Button type="submit" value="" >Add</Button>
            </FormGroup></form></label></div>
              {/* <div><label>Phrases: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('phrases')} defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].phrases} /></label></div> */}
              <div><label>Comments: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('comments')} multiline rowsMax="2" defaultValue={this.props.lessons.lessons.lessonRecords[this.props.targetLesson].comments} /></label></div>


            <Button onClick={()=>{this.updateLessonRecord();}}>Update</Button>
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