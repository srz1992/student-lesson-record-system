import React from 'react';
import { Link } from 'react-router-dom';

const StudentNav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/studentHome">
            Home
          </Link>
        </li>
        <li>
          <Link to="/bookLesson">
            Book Lesson
          </Link>
        </li>
        <li>
            <Link to ="/studentBookedLessons">
          View Bookings
          </Link>
        </li>
        <li>
            <Link to ="/studentViewTeachers">
          View Teachers
          </Link>
        </li>
        
      </ul>
    </div>
  </div>
);

export default StudentNav;
