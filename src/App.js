import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import InfoPage from './components/InfoPage/InfoPage';

// admin pages
import AdminHome from './components/Admin/AdminHome/AdminHome';
import RegisterStudent from './components/Admin/RegisterStudent/RegisterStudent';
import RegisterTeacher from './components/Admin/RegisterTeacher/RegisterTeacher';
import ViewStudents from './components/Admin/ViewStudents/ViewStudents';
import UpdateStudent from './components/Admin/ViewStudents/UpdateStudent';
import AdminViewTeachers from './components/Admin/ViewTeachers/ViewTeachers';
import UpdateTeacher from './components/Admin/ViewTeachers/UpdateTeacher';

// teacher pages
import TeacherHome from './components/Teacher/TeacherHome/TeacherHome';
import TeacherBookedLessons from './components/Teacher/BookedLessons/BookedLessons';
import LessonRequests from './components/Teacher/LessonRequests/LessonRequests';
import SearchStudents from './components/Teacher/SearchStudents/SearchStudents';
import LessonRecord from './components/Teacher/SearchStudents/LessonRecord';
import EditLessonRecord from './components/Teacher/SearchStudents/EditLessonRecord';

// student pages
import StudentHome from './components/Student/StudentHome/StudentHome';
import StudentBookedLessons from './components/Student/BookedLessons/BookedLessons';
import LessonRecords from './components/Student/LessonRecords/LessonRecords';
import BookLessons from './components/Student/BookLesson/BookLesson';
import StudentViewTeachers from './components/Student/ViewTeachers/ViewTeachers';


import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        
        
        {/* Admin Routes */}
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
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
          path="/updateStudent"
          component={UpdateStudent}
        />
        <Route
          path="/viewTeachers"
          component={AdminViewTeachers}
        />
        <Route
          path="/updateTeacher"
          component={UpdateTeacher}
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
          path="/lessonRequests"
          component={LessonRequests}
        />
        <Route
          path="/searchStudents"
          component={SearchStudents}
        />
        <Route
          path="/lessonRecord"
          component={LessonRecord}
        />
        <Route
          path="/editLessonRecord"
          component={EditLessonRecord}
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
        <Route
          path="/lessonRecords"
          component={LessonRecords}
        />
        <Route
          path="/bookLessons"
          component={BookLessons}
        />
        <Route
          path="/studentViewTeachers"
          component={StudentViewTeachers}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
