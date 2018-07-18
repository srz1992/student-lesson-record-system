import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import StudentNav from '../../Nav/StudentNav';
import TeacherProfile from './TeacherProfile'

import {USER_ACTIONS} from '../../../redux/actions/userActions';
import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
import {BOOKING_ACTIONS} from '../../../redux/actions/bookingActions';

// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
  user: state.user,
  teacher: state.person,
  booking: state.booking
});

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
        width: 200,
      },
  });

class ViewTeachers extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      targetTeacher: '',
      profileHidden: true,
      teacherList: [],
      teacher_id: ''
    }
  }
  
  componentDidMount = async() => {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      await this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }    
    console.log('this.state.teacherToUpdate:', this.state.teacherToUpdate);
    await this.getTeacherList();

    
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getTeacherList = () => {
    const action = {type: BOOKING_ACTIONS.FETCH_TEACHER_LIST};
    this.props.dispatch(action);
    return
}

  handleInputChangeFor = propName => async (event) => {
    await this.setState({
      ...this.state,
      [propName]: event.target.value
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
    const {classes} = this.props;
    console.log(this.props.teacher);
    
    if (this.props.user.userName && this.props.user.userType === 'student') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.teacher)}</pre> */}
          <h1 id="welcome">
            View Teachers
          </h1>
          <div><label>Teacher:&emsp;<Select
                
                className={classes.textField}
                label="Select Teacher"
                onChange={this.handleInputChangeFor('targetTeacher')}
                value={this.state.targetTeacher}
                
            >
          {this.props.booking.teacherList.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select></label></div>
          <Button onClick={()=>this.getTeacherById(this.state.targetTeacher)}>Search</Button>
          {this.props.teacher.teacherProfile.teacherCalled && <TeacherProfile targetTeacher={this.state.targetTeacher} getTeacherById={this.getTeacherById} editTeacher={this.editTeacher} />}
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
export default compose(connect(mapStateToProps),withStyles(styles))(ViewTeachers);