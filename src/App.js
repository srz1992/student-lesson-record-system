import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';

// admin pages
import AdminHome from './components/Admin/AdminHome/AdminHome';
import RegisterStudent from './components/Admin/RegisterStudent/RegisterStudent';
import RegisterTeacher from './components/Admin/RegisterTeacher/RegisterTeacher';
import ViewStudents from './components/Admin/ViewStudents/ViewStudents';
import AdminViewTeachers from './components/Admin/ViewTeachers/ViewTeachers';

// teacher pages
import TeacherHome from './components/Teacher/TeacherHome/TeacherHome';
import TeacherBookedLessons from './components/Teacher/BookedLessons/BookedLessons';
import BookingRequests from './components/Teacher/BookingRequests/BookingRequests';
import SearchStudents from './components/Teacher/SearchStudents/SearchStudents';
import LessonRecord from './components/Teacher/SearchStudents/LessonRecord';

// student pages
import StudentHome from './components/Student/StudentHome/StudentHome';
import StudentBookedLessons from './components/Student/BookedLessons/BookedLessons';
import BookLesson from './components/Student/BookLesson/BookLesson';
import StudentViewTeachers from './components/Student/ViewTeachers/ViewTeachers';
import LessonRecords from './components/Student/LessonRecords/LessonRecords'

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Teach Me" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        
        
        {/* Admin Routes */}
        <Route
          path="/home"
          component={LoginPage}
        />
        
        <Route
          path="/adminHome"
          component={AdminHome}
        />
        <Route
          path="/registerStudent"
          component={RegisterStudent}
        />
        <Route
          path="/registerTeacher"
          component={RegisterTeacher}
        />
        <Route
          path="/viewStudents"
          component={ViewStudents}
        />
        <Route
          path="/viewTeachers"
          component={AdminViewTeachers}
        />
        {/* Teacher Routes */}
        <Route
          path="/teacherHome"
          component={TeacherHome}
        />
        <Route
          path="/teacherBookedLessons"
          component={TeacherBookedLessons}
        />
        <Route
          path="/bookingRequests"
          component={BookingRequests}
        />
        <Route
          path="/searchStudents"
          component={SearchStudents}
        />
        <Route
          path="/lessonRecord"
          component={LessonRecord}
        />


        {/* Student Routes */}
        <Route
          path="/studentHome"
          component={StudentHome}
        />
        <Route
          path="/studentBookedLessons"
          component={StudentBookedLessons}
        />
        {/* <Route
          path="/lessonRecords"
          component={LessonRecords}
        /> */}
        <Route
          path="/bookLesson"
          component={BookLesson}
        />
        <Route
          path="/studentViewTeachers"
          component={StudentViewTeachers}
        />
        <Route 
          path="/lessonRecords"
          component={LessonRecords}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
