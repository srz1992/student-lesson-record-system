import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/adminHome">
            Home
          </Link>
        </li>
        <li>
          <Link to="/registerStudent">
            Register Student
          </Link>
        </li>
        <li>
            <Link to ="/registerTeacher">
          Register Teacher
          </Link>
        </li>
        <li>
            <Link to ="/viewStudents">
          View Students
          </Link>
        </li>
        <li>
            <Link to ="/viewTeachers">
          View Teachers
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default AdminNav;
