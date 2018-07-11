import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AdminNav from '../../Nav/AdminNav';
import UpdateStudent from './UpdateStudent'

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

class ViewTeachers extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      studentToGet: null
    }
  }
  
  componentDidMount() {
    this.props.dispatch({ type: PERSON_ACTIONS.FETCH_STUDENT });
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

  handleInputChangeFor = propName => (event) => {
    this.setState({
      [propName]: event.target.value
    })    
  }

  

  getStudentById = (id) =>{
    let action = { type: PERSON_ACTIONS.FETCH_STUDENT, payload: id };
    console.log(action);
    
    this.props.dispatch(action);
  }

  render() {
    let content = null;

    if (this.props.user.userName && this.props.user.userType === 'admin') {
      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.student)}</pre> */}
          <h1 id="welcome">
            View Students
          </h1>
          <TextField onChange={this.handleInputChangeFor('studentToGet')} />
          <Button onClick={()=>this.getStudentById(this.state.studentToGet)}>Search</Button>
          
          
          
          <UpdateStudent />
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