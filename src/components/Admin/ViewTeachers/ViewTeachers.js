import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import AdminNav from '../../../components/Nav/AdminNav';
import UpdateTeacher from './UpdateTeacher'

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

// material ui
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
});

class ViewTeachers extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
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

    if (this.props.user.userName) {
      content = (
        <div>
          <h1 id="welcome">
            View Teachers
          </h1>
          <Button>Edit</Button>
          <UpdateTeacher />
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
