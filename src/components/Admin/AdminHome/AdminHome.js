import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminNav from '../../../components/Nav/AdminNav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';
import { PERSON_ACTIONS } from '../../../redux/actions/personActions';
import { LESSON_ACTIONS } from '../../../redux/actions/lessonActions';


const mapStateToProps = state => ({
  user: state.user,
});

class AdminHome extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    const action = {type:PERSON_ACTIONS.STUDENT_CALLED_RESET};
    this.props.dispatch(action);
    const secondAction = {type:LESSON_ACTIONS.RESET_RECORDS_OBTAINED};
    this.props.dispatch(secondAction)
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
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
export default connect(mapStateToProps)(AdminHome);

