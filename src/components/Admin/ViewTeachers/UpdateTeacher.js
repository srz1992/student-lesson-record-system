// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// import {USER_ACTIONS} from '../../../redux/actions/userActions';
// import {PERSON_ACTIONS} from '../../../redux/actions/personActions';
// import { triggerLogout } from '../../../redux/actions/loginActions';

// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';

// const mapStateToProps = state => ({
//   user: state.user,
//   Teacher: state.person
// });

// class UpdateTeacher extends Component {
  
//   constructor(props){
//     super(props);
//     this.state = {
//       targetTeacher: null,
//       editHidden: true,
//       TeacherToUpdate: {
//         id: this.props.Teacher.TeacherProfile.id,
//         name: this.props.Teacher.TeacherProfile.name,
//         date_of_birth: this.props.Teacher.TeacherProfile.date_of_birth,
//         hometown: this.props.Teacher.TeacherProfile.hometown,
//         hobbies: this.props.Teacher.TeacherProfile.hobbies,
//         notes: this.props.Teacher.TeacherProfile.notes
//       }
//     }
//   }
//   componentDidMount() {
//     if (!this.props.user.isLoading && this.props.user.userName === null) {
//       this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
//     }    
//     console.log('this.state.TeacherToUpdate:', this.state.TeacherToUpdate);
    
//   }

//   componentDidUpdate() {
//     if (!this.props.user.isLoading && this.props.user.userName === null) {
//       this.props.history.push('home');
//     }
//   }

//   logout = () => {
//     this.props.dispatch(triggerLogout());
//     // this.props.history.push('home');
//   }

//   handleUpdateInputChangeFor = propName => (event) => {
//     this.setState({
//       ...this.state,
//       TeacherToUpdate: {
//         ...this.state.TeacherToUpdate,
//         [propName]: event.target.value}
//     })    
//     console.log(this.state);
    
//   }

//   getTeacherById = (id) =>{
//     this.setState({...this.state, TeacherCalled: true});
//     let action = { type: PERSON_ACTIONS.FETCH_Teacher, payload: id };
//     this.props.dispatch(action);
//   }

//   updateTeacherById = (Teacher) => {
//     this.setState({...this.state, editHidden: false})
//     let action = { type: PERSON_ACTIONS.UPDATE_Teacher, payload: Teacher };
//     console.log(action);
//     this.props.dispatch(action);
//     this.props.toggleEditHiddenTrue();
//   }


//   render() {
//     let content = null;

//     if (this.props.user.userName && this.props.user.userType === 'admin') {
//       content = (
//           <div>
//           <h1 id="welcome">
//             Update Teacher
//           </h1>
//           <Paper>
//               <div><label>ID: &emsp;{this.props.Teacher.TeacherProfile.id}</label></div>
//               <div><label>Name: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('name')} defaultValue={this.props.Teacher.TeacherProfile.name} /></label></div>
//               <div><label>Date of Birth: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('date_of_birth')} type="date" defaultValue={this.props.Teacher.TeacherProfile.date_of_birth.split('T')[0]} /></label></div>
//               <div><label>Hometown: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hometown')} defaultValue={this.props.Teacher.TeacherProfile.hometown} /></label></div>
//               <div><label>Hobbies: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('hobbies')} multiline rowsMax="2" defaultValue={this.props.Teacher.TeacherProfile.hobbies} /></label></div>
//               <div><label>Notes: &emsp;<TextField onChange={this.handleUpdateInputChangeFor('notes')} multiline rowsMax="4" defaultValue={this.props.Teacher.TeacherProfile.notes} /></label></div>

//               <Button onClick={()=>{this.updateTeacherById(this.state.TeacherToUpdate);}}>Update</Button>
//             </Paper>
//             </div>
//       );
//     }

//     return (
//       <div>
//         { content }
//       </div>
//     );
//   }
// }

// // this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(UpdateTeacher);