import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNav from '../../Nav/AdminNav';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'

class RegisterStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      type: 'student',
      name: '',
      date_of_birth: '',
      hometown: '',
      hobbies: '',
      notes: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Choose a username and password!',
      });
    } else {
      const user = {
      ...this.state
      }

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', user)
        .then((response) => {
          if (response.status === 201) {
              this.props.history.push('/adminHome');

            }
           else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
    console.log(this.state);
    
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        <AdminNav />
        {this.renderAlert()}
        <Paper>
        <form onSubmit={this.registerUser}>
          <h1>Register Student</h1>
          <div>
          <div>
            <label>
              Username: &emsp; 
              <TextField
                id="multiline-flexible"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          </div>
          <div>
            <label>
              Password: &emsp; 
              <TextField
                id="multiline-flexible"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
            <div>
            <label>
              Name: &emsp; 
              <TextField
                id="multiline-flexible"
                value={this.state.name}
                onChange={this.handleInputChangeFor('name')}
              />
            </label>
          </div>
            <div>
            <label>
              Date of Birth: &emsp; 
              <TextField
                id="multiline-flexible"
                type="date"
                value={this.state.date_of_birth}
                onChange={this.handleInputChangeFor('date_of_birth')}
              />
            </label>
          </div>
            <div>
            <label>
              Hometown: &emsp; 
              <TextField
                id="multiline-flexible"
                value={this.state.hometown}
                onChange={this.handleInputChangeFor('hometown')}
              />
            </label>
          </div>
            <div>
            <label>
              Hobbies: &emsp; 
              <TextField
                id="multiline-flexible"
                multiline
                rowsMax="2"
                value={this.state.hobbies}
                onChange={this.handleInputChangeFor('hobbies')}
              />
            </label>
          </div>
          <div>
            <label>
              Notes:&emsp;
              <TextField
                id="multiline-flexible"
                multiline
                rowsMax="4"
                value={this.state.notes}
                onChange={this.handleInputChangeFor('notes')}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/adminHome">Cancel</Link>
          </div>
         
        </form>
        </Paper>
      </div>
    );
  }
}

export default RegisterStudent;

